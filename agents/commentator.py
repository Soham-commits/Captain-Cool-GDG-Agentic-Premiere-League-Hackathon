from google.adk.agents import LlmAgent

with open("prompts/Commentator.txt", "r") as f:
    COMMENTATOR_PROMPT = f.read()

commentator = LlmAgent(
    name="Commentator",
    model="gemini-2.5-flash",
    instruction=COMMENTATOR_PROMPT,
    description="Delivers the final call in Harsha Bhogle broadcast style with confidence score and counterfactual."
)
