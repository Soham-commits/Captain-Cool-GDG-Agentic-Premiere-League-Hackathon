from google.adk.tools import FunctionTool
import google.generativeai as genai
import os

def fetch_live_match_state(match_url: str) -> dict:
    """
    Fetches live match state from a Cricbuzz or ESPNCricinfo URL
    using Gemini's URL context tool.
    
    Args:
        match_url: Live match URL from Cricbuzz or ESPNCricinfo
    
    Returns:
        Extracted match state as structured data
    """
    try:
        client = genai.GenerativeModel("gemini-2.5-flash")
        
        prompt = """
        Extract the current match state from this cricket scorecard URL.
        Return ONLY a structured summary with:
        - Innings (1 or 2)
        - Current over and ball
        - Score and wickets
        - Batsmen at crease (striker and non-striker) with their scores
        - Bowlers used and overs remaining per bowler
        - Target and required run rate (if 2nd innings)
        - Venue
        
        Be precise. Use only what's visible on the page.
        """
        
        response = client.generate_content([
            {"url": match_url},
            prompt
        ])
        
        return {
            "match_state": response.text,
            "source": match_url,
            "status": "success"
        }
        
    except Exception as e:
        return {
            "match_state": None,
            "status": "failed",
            "error": str(e)
        }

cricbuzz_tool = FunctionTool(func=fetch_live_match_state)
