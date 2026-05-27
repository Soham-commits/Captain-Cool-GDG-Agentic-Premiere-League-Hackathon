import requests
import os
from google.adk.tools import FunctionTool

def get_dew_factor(venue_city: str) -> dict:
    """
    Fetches real-time weather and calculates dew factor for a venue city.
    
    Args:
        venue_city: City where the match is being played
    
    Returns:
        Dew factor assessment and current weather conditions
    """
    api_key = os.getenv("OPENWEATHER_API_KEY")
    
    try:
        url = f"http://api.openweathermap.org/data/2.5/weather?q={venue_city}&appid={api_key}&units=metric"
        response = requests.get(url, timeout=5)
        data = response.json()

        humidity = data["main"]["humidity"]
        temp = data["main"]["temp"]
        wind_speed = data["wind"]["speed"]
        description = data["weather"][0]["description"]

        # Dew factor logic
        if humidity > 80 and temp < 25:
            dew_factor = "High"
            dew_impact = "Spinners severely affected — ball grip compromised. Pace bowlers favored in death overs."
        elif humidity > 65:
            dew_factor = "Medium"
            dew_impact = "Dew setting in — monitor spinner effectiveness after over 15."
        else:
            dew_factor = "Low"
            dew_impact = "Minimal dew impact — pitch conditions stable."

        return {
            "dew_factor": dew_factor,
            "humidity": humidity,
            "temperature": temp,
            "wind_speed": wind_speed,
            "conditions": description,
            "dew_impact": dew_impact
        }

    except Exception as e:
        return {
            "dew_factor": "Unknown",
            "humidity": "N/A",
            "dew_impact": f"Weather data unavailable: {str(e)}. Use pitch-side observation.",
            "error": str(e)
        }

weather_dew_tool = FunctionTool(func=get_dew_factor)
