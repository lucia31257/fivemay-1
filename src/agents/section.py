# app/agent/session.py
import base64
import json
from google.adk.runners import InMemoryRunner
from google.adk.agents import LiveRequestQueue
from app.agent.config import run_config
from google_search_agent.agent import root_agent
from google.genai.types import Content, Part

APP_NAME = "ADK Streaming example"
active_sessions = {}


async def start_agent_session(user_id: str, is_audio=False):
    runner = InMemoryRunner(app_name=APP_NAME, agent=root_agent)
    session = await runner.session_service.create_session(app_name=APP_NAME, user_id=user_id)
    config = run_config(is_audio)
    live_request_queue = LiveRequestQueue()
    live_events = runner.run_live(
        session=session, live_request_queue=live_request_queue, run_config=config)
    return live_events, live_request_queue


async def agent_to_client_sse(live_events):
    async for event in live_events:
        part = event.content.parts[0] if event.content and event.content.parts else None
        if event.turn_complete or event.interrupted:
            yield f"data: {json.dumps({'turn_complete': event.turn_complete, 'interrupted': event.interrupted})}\n\n"
        elif part:
            if part.text and event.partial:
                yield f"data: {json.dumps({'mime_type': 'text/plain', 'data': part.text})}\n\n"
            elif part.inline_data and part.inline_data.mime_type.startswith("audio/pcm"):
                data = base64.b64encode(part.inline_data.data).decode("ascii")
                yield f"data: {json.dumps({'mime_type': 'audio/pcm', 'data': data})}\n\n"
