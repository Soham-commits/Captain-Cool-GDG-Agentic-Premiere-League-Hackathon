import { useEffect, useRef, useState } from 'react';
import DebatePanel, { type DebateResults } from '../components/DebatePanel';
import MatchInputForm, { type MatchFormSubmitData } from '../components/MatchInputForm';

const buildMockDebate = (data: MatchFormSubmitData): DebateResults => {
  const contextHint =
    data.type === 'form'
      ? `${data.payload.currentScore} at ${data.payload.over}.${data.payload.ball} overs`
      : 'live context import';

  return {
    agents: [
      {
        id: 'stats',
        name: '📊 Stats Analyst',
        model: 'gemini-2.5-flash',
        accentColor: '#1565c0',
        output: `Pressure window identified: ${contextHint}. Yorker execution + boundary denial keeps projected edge around 58-63%.`,
      },
      {
        id: 'strategist',
        name: '🧠 Strategist',
        model: 'gemini-2.5-flash',
        accentColor: '#00e676',
        output:
          'Primary plan: force batsman to hit against the larger side, hold one elite over for the final six balls, and protect straight boundaries with pace-off variation.',
      },
      {
        id: 'devil',
        name: "⚔️ Devil's Advocate",
        model: 'gemini-2.5-flash',
        accentColor: '#ef5350',
        output:
          'Risk alert: over-committing to slower balls lets experienced finishers premeditate. One missed length could swing the chase in two deliveries.',
      },
      {
        id: 'strategist2',
        name: '🔄 Strategist Round 2',
        model: 'gemini-2.5-flash',
        accentColor: '#ff8f00',
        output:
          'Revision: mix hard length at body with occasional yorker, keep deep third man finer, and preserve matchup flexibility if an impact player enters.',
      },
      {
        id: 'commentator',
        name: '🎙️ Commentator',
        model: 'gemini-2.5-flash',
        accentColor: '#7b1fa2',
        output: 'Final synthesis complete.',
      },
    ],
    finalCall: 'Back the disciplined death plan: boundary denial first, wickets by pressure not panic.',
    confidence: 72,
    counterfactual: {
      scenario: 'If dew rises one level and yorker accuracy drops, switch earlier to wide-line pace-off with two sweepers.',
      shift: -8.5,
    },
    dissentCore:
      'If the striker has already calibrated slower balls, the conservative field becomes predictable; attack stumps for a two-ball wicket chance.',
  };
};

const Analyze = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [results, setResults] = useState<DebateResults | null>(null);
  const stepIntervalRef = useRef<number | null>(null);
  const resultTimerRef = useRef<number | null>(null);

  const clearTimers = () => {
    if (stepIntervalRef.current) {
      window.clearInterval(stepIntervalRef.current);
      stepIntervalRef.current = null;
    }
    if (resultTimerRef.current) {
      window.clearTimeout(resultTimerRef.current);
      resultTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  const handleAnalyze = (data: MatchFormSubmitData) => {
    clearTimers();
    setIsLoading(true);
    setActiveStep(1);
    setResults(null);

    stepIntervalRef.current = window.setInterval(() => {
      setActiveStep((prev) => Math.min(prev + 1, 5));
    }, 800);

    resultTimerRef.current = window.setTimeout(() => {
      clearTimers();
      setActiveStep(5);
      setResults(buildMockDebate(data));
      setIsLoading(false);
    }, 4200);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
      {/* Left Panel: Match Input */}
      <div className="w-full">
        <MatchInputForm onSubmit={handleAnalyze} isLoading={isLoading} />
      </div>
      
      {/* Right Panel: Debate Reveal */}
      <div className="w-full bg-card border border-white/10 rounded-xl p-5 min-h-[500px]">
        <DebatePanel isLoading={isLoading} activeStep={activeStep} results={results} />
      </div>
    </div>
  );
};

export default Analyze;
