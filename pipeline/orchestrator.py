import os
import asyncio
from dotenv import load_dotenv
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai.types import Content, Part

from agents.stats_analyst import stats_analyst
from agents.strategist import strategist
from agents.devils_advocate import devils_advocate
from agents.strategist_round2 import strategist_round2
from agents.commentator import commentator

load_dotenv()

os.environ["GOOGLE_API_KEY"] = os.getenv("GEMINI_API_KEY", "")

session_service = InMemorySessionService()

async def run_agent(agent, user_input: str, session_id: str) -> str:
    runner = Runner(
        agent=agent,
        app_name="captain_cool",
        session_service=session_service
    )

    await session_service.create_session(
        app_name="captain_cool",
        user_id="ipl_captain",
        session_id=session_id
    )

    message = Content(
        role="user",
        parts=[Part(text=user_input)]
    )

    response_text = ""
    async for event in runner.run_async(
        user_id="ipl_captain",
        session_id=session_id,
        new_message=message
    ):
        if event.is_final_response():
            if event.content and event.content.parts:
                response_text = event.content.parts[0].text

    return response_text


def format_match_state(match_state: dict) -> str:
    return f"""
Innings: {match_state.get('innings', 'N/A')}
Over: {match_state.get('over', 'N/A')}, Ball: {match_state.get('ball', 'N/A')}
Score: {match_state.get('score', 'N/A')}, Wickets: {match_state.get('wickets', 'N/A')}
Batting Team: {match_state.get('batting_team', 'N/A')}
Bowling Team: {match_state.get('bowling_team', 'N/A')}
Striker: {match_state.get('striker', 'N/A')}
Non-Striker: {match_state.get('non_striker', 'N/A')}
Bowlers Remaining: {match_state.get('bowlers_remaining', 'N/A')}
Pitch: {match_state.get('pitch_conditions', 'N/A')}
Venue: {match_state.get('venue', 'N/A')}
Target: {match_state.get('target', 'N/A')}
Required Run Rate: {match_state.get('required_run_rate', 'N/A')}
Impact Player Available: {match_state.get('impact_player_available', 'N/A')}
Dew Factor: {match_state.get('dew_factor', 'N/A')}
"""


async def run_pipeline(match_state: dict) -> dict:
    results = {}
    match_input = format_match_state(match_state)

    print("\n🏏 CAPTAIN COOL — MATCH ANALYSIS STARTING\n")
    print("=" * 60)

    # Agent 1 — Stats Analyst
    print("\n📊 Stats Analyst processing...\n")
    stats_output = await run_agent(stats_analyst, match_input, "stats_session")
    results["stats_analyst"] = stats_output
    print(stats_output)

    # Agent 2 — Strategist
    print("\n🧠 Strategist forming the call...\n")
    strategist_output = await run_agent(
        strategist,
        f"MATCH STATE:\n{match_input}\n\nSTATS ANALYST BRIEF:\n{stats_output}",
        "strategist_session"
    )
    results["strategist"] = strategist_output
    print(strategist_output)

    # Agent 3 — Devil's Advocate
    print("\n⚔️  Devil's Advocate challenging...\n")
    devils_output = await run_agent(
        devils_advocate,
        f"STATS ANALYST BRIEF:\n{stats_output}\n\nSTRATEGIST DECISION:\n{strategist_output}",
        "devils_session"
    )
    results["devils_advocate"] = devils_output
    print(devils_output)

    # Agent 4 — Strategist Round 2
    print("\n🔄 Strategist responding to challenge...\n")
    round2_output = await run_agent(
        strategist_round2,
        f"ORIGINAL DECISION:\n{strategist_output}\n\nDEVIL'S ADVOCATE CHALLENGE:\n{devils_output}",
        "round2_session"
    )
    results["strategist_round2"] = round2_output
    print(round2_output)

    # Agent 5 — Commentator
    print("\n🎙️  Commentator delivering final call...\n")
    commentator_output = await run_agent(
        commentator,
        f"STATS ANALYST BRIEF:\n{stats_output}\n\nSTRATEGIST ORIGINAL CALL:\n{strategist_output}\n\nDEVIL'S ADVOCATE CHALLENGE:\n{devils_output}\n\nSTRATEGIST FINAL DECISION:\n{round2_output}",
        "commentator_session"
    )
    results["commentator"] = commentator_output
    print(commentator_output)

    print("\n" + "=" * 60)
    print("✅ CAPTAIN COOL ANALYSIS COMPLETE\n")

    return results
