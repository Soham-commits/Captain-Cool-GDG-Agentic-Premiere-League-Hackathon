from google.adk.agents import LlmAgent
from tools.win_probability import win_probability_tool
from tools.weather_dew import weather_dew_tool

with open("prompts/Stats Analyst.txt", "r") as f:
    STATS_ANALYST_PROMPT = f.read()

stats_analyst = LlmAgent(
    name="StatsAnalyst",
    model="gemini-2.5-flash",
    instruction=STATS_ANALYST_PROMPT,
    tools=[win_probability_tool, weather_dew_tool],
    description="Analyzes match state and produces a data-grounded tactical brief."
)
