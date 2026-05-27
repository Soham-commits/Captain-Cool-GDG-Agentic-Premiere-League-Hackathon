from google.adk.agents import LlmAgent

with open("prompts/DevilsAdvocate.txt", "r") as f:
    DEVILS_ADVOCATE_PROMPT = f.read()

devils_advocate = LlmAgent(
    name="DevilsAdvocate",
    model="gemini-2.5-flash",
    instruction=DEVILS_ADVOCATE_PROMPT,
    description="Challenges the Strategist's call with specific statistical counterarguments."
)
