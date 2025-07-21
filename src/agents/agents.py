from google.adk.agents import Agent

from src.llms.llm import get_llm_by_type
from src.config.agents import AGENT_LLM_MAP


# Create agents using configured LLM types
def create_agent(agent_name: str, agent_type: str, description: str, prompt: str, tools: list):
    """Factory function to create agents with consistent configuration."""
    return Agent(
        name=agent_name,
        model=get_llm_by_type(AGENT_LLM_MAP[agent_type]),
        description=description,
        instruction=prompt,
        tools=tools,
    )
