import asyncio
import json
from pipeline.orchestrator import run_pipeline

# Demo match state — MI vs CSK, Over 18
DEMO_MATCH_STATE = {
    "innings": 2,
    "over": 18,
    "ball": 1,
    "score": "156/3",
    "wickets": 3,
    "batting_team": "Chennai Super Kings",
    "bowling_team": "Mumbai Indians",
    "striker": "MS Dhoni (34* off 28)",
    "non_striker": "Ravindra Jadeja (12* off 8)",
    "bowlers_remaining": "Bumrah: 2 overs, Chahal: 1 over, Pandya: 1 over",
    "pitch_conditions": "Flat",
    "venue": "Wankhede Stadium, Mumbai",
    "target": 181,
    "required_run_rate": 12.5,
    "impact_player_available": True,
    "dew_factor": "High"
}

async def main():
    results = await run_pipeline(DEMO_MATCH_STATE)
    
    # Save results to file
    with open("last_analysis.json", "w") as f:
        json.dump(results, f, indent=2)
    
    print("📁 Full analysis saved to last_analysis.json")

if __name__ == "__main__":
    asyncio.run(main())
