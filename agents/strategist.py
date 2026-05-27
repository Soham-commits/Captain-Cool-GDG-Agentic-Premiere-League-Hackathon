from google.adk.agents import LlmAgent

with open("prompts/Stratergist.txt", "r") as f:
    STRATEGIST_PROMPT = f.read()

strategist = LlmAgent(
    name="Strategist",
    model="gemini-2.5-flash",
    instruction=STRATEGIST_PROMPT,
    description="Makes the tactical call in Dhoni mode based on the Stats Analyst brief."
)
