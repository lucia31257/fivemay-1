import json
import base64
from dotenv import load_dotenv
from google.genai.types import Part, Content, Blob
from google.adk.runners import InMemoryRunner
from google.adk.agents import LiveRequestQueue
from google.adk.agents.run_config import RunConfig

from google_search_agent.agent import root_agent

load_dotenv()

APP_NAME = "ADK Streaming Example"
active_sessions = {}  # Session store


async def start_agent_session(user_id, is_audio=False):
    runner = InMemoryRunner(app_name=APP_NAME, agent=root_agent)
    session = await runner.session_service.create_session(app_name=APP_NAME, user_id=user_id)
    modality = "AUDIO" if is_audio else "TEXT"
    run_config = RunConfig(response_modalities=[modality])
    live_request_queue = LiveRequestQueue()
    live_events = runner.run_live(
        session=session, live_request_queue=live_request_queue, run_config=run_config)
    return live_events, live_request_queue


async def agent_to_client_sse(live_events):
    async for event in live_events:
        if event.turn_complete or event.interrupted:
            message = {
                "turn_complete": event.turn_complete,
                "interrupted": event.interrupted,
            }
            yield f"data: {json.dumps(message)}\n\n"
            continue

        part: Part = event.content and event.content.parts and event.content.parts[0]
        if not part:
            continue

        if part.inline_data and part.inline_data.mime_type.startswith("audio/pcm"):
            audio_data = part.inline_data.data
            message = {
                "mime_type": "audio/pcm",
                "data": base64.b64encode(audio_data).decode("ascii")
            }
            yield f"data: {json.dumps(message)}\n\n"
        elif part.text and event.partial:
            message = {
                "mime_type": "text/plain",
                "data": part.text
            }
            yield f"data: {json.dumps(message)}\n\n"
