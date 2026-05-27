from google.adk.agents import LlmAgent

with open("prompts/StrategistRound2.txt", "r") as f:
    STRATEGIST_ROUND2_PROMPT = f.read()

strategist_round2 = LlmAgent(
    name="StrategistRound2",
    model="gemini-2.5-flash",
    instruction=STRATEGIST_ROUND2_PROMPT,
    description="Defends or revises the original call after the Devil's Advocate challenge."
)
