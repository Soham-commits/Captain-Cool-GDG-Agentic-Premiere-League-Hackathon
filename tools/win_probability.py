from google.adk.tools import FunctionTool

def calculate_win_probability(
    runs_needed: int,
    balls_remaining: int,
    wickets_lost: int,
    current_run_rate: float,
    venue_avg_score: int = 175
) -> dict:
    """
    Calculates win probability for the batting team.
    
    Args:
        runs_needed: Runs required to win
        balls_remaining: Balls left in innings
        wickets_lost: Wickets fallen so far
        current_run_rate: Current run rate
        venue_avg_score: Historical average score at venue
    
    Returns:
        Win probability percentage and context
    """
    if balls_remaining <= 0:
        return {"win_probability": 0, "context": "Innings over"}

    required_run_rate = (runs_needed * 6) / balls_remaining
    wickets_in_hand = 10 - wickets_lost

    # Base probability from RRR
    rrr_factor = max(0, 1 - ((required_run_rate - current_run_rate) / 10))

    # Wickets in hand factor
    wicket_factor = wickets_in_hand / 10

    # Venue factor
    venue_factor = min(1, venue_avg_score / 175)

    # Composite score
    raw_prob = (rrr_factor * 0.5) + (wicket_factor * 0.35) + (venue_factor * 0.15)
    win_prob = round(min(95, max(5, raw_prob * 100)), 1)

    return {
        "win_probability": win_prob,
        "required_run_rate": round(required_run_rate, 2),
        "wickets_in_hand": wickets_in_hand,
        "context": f"Win prob: {win_prob}% — RRR {round(required_run_rate, 2)} vs current {current_run_rate}"
    }

win_probability_tool = FunctionTool(func=calculate_win_probability)
