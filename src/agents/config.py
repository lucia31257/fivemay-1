# app/agent/config.py
from google.adk.agents.run_config import RunConfig


def run_config(is_audio=False):
    modality = "AUDIO" if is_audio else "TEXT"
    return RunConfig(response_modalities=[modality])
