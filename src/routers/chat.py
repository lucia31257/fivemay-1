from fastapi import APIRouter, Request
from fastapi.responses import StreamingResponse
from schemas.chat import ChatRequest, ChatResponse
from datetime import datetime
import uuid
import base64
from google.genai.types import Content, Part, Blob

from utils.agent_utils import (
    start_agent_session,
    agent_to_client_sse,
    active_sessions
)

router = APIRouter()


@router.post("/chat/stream", response_model=ChatResponse)
async def chat_stream(request: ChatRequest):
    return ChatResponse(
        conversation_id=request.conversation_id or str(uuid.uuid4()),
        user_message=request.message,
        agent_response="hello, " + request.message,
        timestamp=datetime.now().isoformat()
    )


@router.get("/events/{user_id}")
async def sse_endpoint(user_id: int, is_audio: str = "false"):
    user_id_str = str(user_id)
    live_events, live_request_queue = await start_agent_session(user_id_str, is_audio == "true")
    active_sessions[user_id_str] = live_request_queue

    async def event_generator():
        try:
            async for data in agent_to_client_sse(live_events):
                yield data
        finally:
            live_request_queue.close()
            active_sessions.pop(user_id_str, None)

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Cache-Control"
        }
    )


@router.post("/send/{user_id}")
async def send_message(user_id: int, request: Request):
    user_id_str = str(user_id)
    live_request_queue = active_sessions.get(user_id_str)
    if not live_request_queue:
        return {"error": "Session not found"}

    message = await request.json()
    mime_type = message["mime_type"]
    data = message["data"]

    if mime_type == "text/plain":
        content = Content(role="user", parts=[Part.from_text(text=data)])
        live_request_queue.send_content(content=content)
    elif mime_type == "audio/pcm":
        decoded_data = base64.b64decode(data)
        live_request_queue.send_realtime(
            Blob(data=decoded_data, mime_type=mime_type))
    else:
        return {"error": f"Mime type not supported: {mime_type}"}

    return {"status": "sent"}
