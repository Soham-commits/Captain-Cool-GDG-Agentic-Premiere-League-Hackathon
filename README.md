# 🏏 Captain Cool — Multi-Agent IPL Match Strategist

> *"Cricket is a captain's game. We built the captain's second brain."*

<p align="center">
  <img src="https://img.shields.io/badge/Built%20on-Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white"/>
  <img src="https://img.shields.io/badge/Framework-Google%20ADK-34A853?style=for-the-badge&logo=google&logoColor=white"/>
  <img src="https://img.shields.io/badge/APL-Agentic%20Premier%20League-FF6D00?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Venue-Pune-blue?style=for-the-badge"/>
</p>

---

## 🏆 APL Submission

**Event:** GDG - Agentic Premier League (APL) — Pune  
**Problem Statement:** Captain Cool — The Multi-Agent IPL Match Strategist  
**Stack:** Google Gemini 2.5 Pro/Flash · Google ADK · Vertex AI Agent Engine  

---

## What Is Captain Cool?

Captain Cool is a **5-agent agentic AI system** that acts as a virtual IPL captain — making the next tactical decision in a live match the way MS Dhoni would.

Give it any match state. It debates itself. Then it gives you the call.

The system doesn't just output a decision — it shows you the **entire internal debate**: the stats brief, the strategic proposal, the counterargument, the revision, and the final broadcast-ready call with a confidence score and counterfactual.

---

## 🤖 The Five Agents

```
Match State Input
       │
       ▼
┌─────────────────────┐
│   Stats Analyst     │  gemini-2.5-flash
│                     │  Tools: win_probability(), Cricbuzz URL context,
│                     │         OpenWeatherMap dew factor
│  Produces: matchup  │
│  dynamics, bowler   │
│  constraints, win % │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│    Strategist       │  gemini-2.5-pro
│    (Dhoni Mode)     │
│                     │
│  Proposes: bowler,  │
│  field, Impact      │
│  Player, timeout    │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  Devil's Advocate   │  gemini-2.5-flash
│                     │
│  Challenges with    │
│  specific stats.    │
│  One surgical       │
│  counterargument.   │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  Strategist Rd. 2   │  gemini-2.5-pro
│                     │
│  Defends or revises │
│  the call. Names    │
│  the failure mode.  │
│  Commits fully.     │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│    Commentator      │  gemini-2.5-flash
│  (Harsha Bhogle)    │
│                     │
│  Final call in      │
│  broadcast cricket  │
│  language +         │
│  confidence score + │
│  counterfactual     │
└─────────────────────┘
```

---

## ✅ Hard Requirements Met

| Requirement | How |
|-------------|-----|
| 3+ distinct Gemini agents | 5 agents, each with own system prompt, model, and role |
| Real tool call | `calculate_win_probability()` as ADK tool + Gemini URL context on live Cricbuzz URL + OpenWeatherMap API |
| Visible multi-turn debate | Strategist → Devil's Advocate → Strategist Round 2 — surfaced in split-panel UI |
| Cricket-language explainability | Commentator agent in Harsha Bhogle persona with counterfactual and confidence score |
| Google Antigravity traces | See `.antigravity/` folder and commit history |
| Gemini-only stack | Zero OpenAI / Anthropic / Groq calls anywhere |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Agent Framework | Google ADK (Python) |
| LLM — Reasoning agents | `gemini-2.5-pro` |
| LLM — Speed agents | `gemini-2.5-flash` |
| Tool: Win Probability | Custom ADK function tool |
| Tool: Live Data | Gemini URL Context (Cricbuzz / ESPNCricinfo) |
| Tool: Dew Factor | OpenWeatherMap API |
| Memory | Gemini Context Caching (multi-over continuity) |
| Frontend | React + Tailwind |
| Voice | Web Speech API (input) + Gemini Live API (output) |
| Hosting | Vertex AI Agent Engine |
| IDE | Google Antigravity / Project IDX |
| Prompt Prototyping | Google AI Studio |

---

## 📥 Input Modes

Captain Cool accepts match state in three ways:

**1. Structured Form**
```
Innings, over, ball, score, wickets
Batsmen at crease, bowlers remaining
Pitch conditions, dew factor, venue
Target / required run rate
Impact Player availability
```

**2. Live URL**
Paste any Cricbuzz or ESPNCricinfo match URL. The system extracts the full match state using Gemini's URL context tool.

**3. Screenshot**
Upload a scorecard screenshot. Gemini 2.5 Pro Vision extracts the match state directly from the image.

---

## 📤 Output

Every decision includes:

- **The Call** — one decisive tactical move in cricket language
- **The Debate** — Strategist proposal → Devil's Advocate challenge → Strategist revision, fully visible
- **The Dissent** — the losing argument, surfaced prominently
- **Confidence Score** — specific percentage with trigger conditions
- **Counterfactual** — win probability shift vs. the road not taken

---

## 🗂️ Project Structure

```
captain-cool/
├── .antigravity/          # Google Antigravity agent traces
├── prompts/
│   ├── StatsAnalyst.ts
│   ├── Strategist.ts
│   ├── Devil's Advocate.ts
│   ├── StrategistRound2.ts
│   └── Commentator.ts
├── agents/
│   ├── stats_analyst.py
│   ├── strategist.py
│   ├── devils_advocate.py
│   ├── strategist_round2.py
│   └── commentator.py
├── tools/
│   ├── win_probability.py
│   ├── cricbuzz_context.py
│   └── weather_dew.py
├── pipeline/
│   └── orchestrator.py
├── frontend/
│   └── src/
├── memory/
│   └── context_cache.py
├── main.py
├── requirements.txt
└── README.md
```

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/Soham-commits/captain-cool.git
cd captain-cool

# Install dependencies
pip install google-adk google-generativeai fastapi uvicorn requests

# Set environment variables
export GEMINI_API_KEY=your_key_here
export OPENWEATHER_API_KEY=your_key_here

# Run the pipeline
python main.py

# Start the frontend
cd frontend && npm install && npm run dev
```

---

## 🧪 Demo Scenario

**MI vs CSK, Over 18, Ball 1**
CSK needs 25 from 12. MS Dhoni on strike (34* off 28).
Bumrah has 2 overs left. Dew factor: High. Wankhede, Mumbai.

Watch the system debate itself — and change its mind.

---

## 📝 Documentation & Blog

Full architecture walkthrough, agent system prompts, AI Studio links, and end-to-end scenario on dev.to:

→ **[Read the blog](#)** *(link added post-publish)*

---

## 📊 APL Rubric Self-Assessment

| Category | Target | How We Address It |
|----------|--------|------------------|
| Relevance (250) | 240+ | 3 input modes, live URL scraping, cricket-deep prompts, Harsha Bhogle output |
| Technical Depth (250) | 240+ | True ADK orchestration, 3 real tools, Vertex AI hosting, Gemini-only stack |
| Innovation & Agentic Design (250) | 235+ | Visible debate loop, counterfactual engine, context caching, voice I/O |
| Documentation & Blog (250) | 245+ | Architecture diagram, all prompts verbatim, AI Studio links, full scenario walkthrough |

---

## 🙏 Built With

- [Google ADK](https://google.github.io/adk-docs/)
- [Google AI Studio](https://aistudio.google.com)
- [Gemini 2.5 Pro & Flash](https://deepmind.google/technologies/gemini/)
- [Vertex AI Agent Engine](https://cloud.google.com/vertex-ai)
- [Project IDX / Google Antigravity](https://idx.google.com)

---

*Captain Cool — Built for APL. Powered by Gemini. Thinks like Dhoni.*
