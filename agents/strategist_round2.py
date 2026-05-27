from google.adk.agents import LlmAgent

with open("prompts/Stratergist Round 2.ts", "r") as f:
    STRATEGIST_ROUND2_PROMPT = f.read()

strategist_round2 = LlmAgent(
    name="StrategistRound2",
    model="gemini-1.5-pro",
    instruction=STRATEGIST_ROUND2_PROMPT,
    description="Defends or revises the original call after the Devil's Advocate challenge."
)
