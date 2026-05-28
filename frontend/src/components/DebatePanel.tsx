
export type AgentResult = {
  id: 'stats' | 'strategist' | 'devil' | 'strategist2' | 'commentator';
  name: string;
  model: 'gemini-2.5-pro' | 'gemini-2.5-flash';
  accentColor: string;
  output: string;
};

export type DebateResults = {
  agents: AgentResult[];
  finalCall: string;
  confidence: number;
  counterfactual: {
    scenario: string;
    shift: number;
  };
  dissentCore: string;
};

type DebatePanelProps = {
  isLoading: boolean;
  activeStep: number;
  results: DebateResults | null;
};

const loadingSteps = [
  { name: 'Stats Analyst', message: 'Gathering intel...', emoji: '📊' },
  { name: 'Strategist', message: 'Forming the call...', emoji: '🧠' },
  { name: 'Devil\'s Advocate', message: 'Finding the flaw...', emoji: '⚔️' },
  { name: 'Strategist Round 2', message: 'Reconsidering...', emoji: '🔄' },
  { name: 'Commentator', message: 'Delivering the verdict...', emoji: '🎙️' },
];

const DebatePanel = ({ isLoading, activeStep, results }: DebatePanelProps) => {
  if (isLoading) {
    const visibleSteps = loadingSteps.filter((_, index) => index < activeStep);

    return (
      <div className="flex flex-col gap-4 mt-4">
        {visibleSteps.map((step, index) => {
          const isActive = index + 1 === activeStep;
          return (
            <div key={step.name} className="flex items-center gap-3 text-[14px] text-[var(--text-secondary)]">
              <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-[var(--green-primary)] animate-pulse' : 'bg-[#424242]'}`} />
              <span className="font-semibold text-[var(--text-primary)]">{step.emoji} {step.name}</span>
              <span>—</span>
              <span>{step.message}</span>
            </div>
          );
        })}
      </div>
    );
  }

  if (!results) {
    return (
      <div className="h-full min-h-[500px] flex flex-col items-center justify-center p-6 text-center">
        <h3 className="text-[18px] text-[#424242] mb-2">Awaiting match state</h3>
        <p className="text-[14px] text-[#424242] max-w-sm">
          Fill in the match context and hit analyze to watch the agents debate in real time.
        </p>
      </div>
    );
  }

  const commentator = results.agents.find((agent) => agent.id === 'commentator');
  const standardAgents = results.agents.filter((agent) => agent.id !== 'commentator');

  return (
    <div className="flex flex-col gap-4">
      {standardAgents.map((agent) => (
        <div key={agent.id} className="card-style p-[28px] relative" style={{ borderLeft: `4px solid ${agent.accentColor}` }}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[14px] font-semibold uppercase tracking-[1px] text-[var(--text-primary)]">
              {agent.name}
            </h3>
            <span
              className="px-2 py-1 text-[10px] font-mono rounded-full font-semibold"
              style={{
                backgroundColor: agent.model === 'gemini-2.5-pro' ? '#ff6d00' : '#242428',
                color: agent.model === 'gemini-2.5-pro' ? '#000000' : '#9e9e9e',
              }}
            >
              {agent.model}
            </span>
          </div>
          <p className="font-mono text-[13px] text-[var(--text-secondary)] whitespace-pre-line leading-[1.8]">
            {agent.output}
          </p>
        </div>
      ))}

      {commentator && (
        <div className="card-style p-[32px] mt-4 w-full relative" style={{ borderLeft: "4px solid", borderImage: "linear-gradient(180deg, #1a73e8, #00c853, #f9ab00, #ea4335) 1" }}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[14px] font-semibold uppercase tracking-[1px] text-[var(--text-primary)]">
              {commentator.name}
            </h3>
            <span
              className="px-2 py-1 text-[10px] font-mono rounded-full font-semibold"
              style={{ backgroundColor: '#242428', color: '#9e9e9e' }}
            >
              {commentator.model}
            </span>
          </div>

          <p className="text-[20px] font-semibold text-[var(--green-primary)] leading-tight mb-8">
            {results.finalCall}
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="flex flex-col">
              <span className="overline-label mb-2">CONFIDENCE</span>
              <div className="text-[48px] font-extrabold text-[var(--green-primary)] leading-none mb-2">
                {results.confidence}%
              </div>
              {/* Circular arc gauge replacement */}
              <div className="w-full bg-[var(--bg-primary)] h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[var(--green-primary)] h-full rounded-full" 
                  style={{ width: `${results.confidence}%` }} 
                />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="overline-label mb-2" style={{ color: 'var(--orange-accent)' }}>WHAT IF</span>
              <p className="font-mono text-[13px] text-[var(--text-secondary)] leading-[1.6] mb-3">
                {results.counterfactual.scenario}
              </p>
              <div className="text-[var(--orange-accent)] font-semibold text-[13px]">
                WIN PROBABILITY SHIFT ↓ {results.counterfactual.shift}%
              </div>
            </div>
          </div>

          <div className="pt-[16px]" style={{ borderTop: '1px solid rgba(239,83,80,0.2)' }}>
            <span className="text-[10px] font-medium tracking-[2px] uppercase text-[var(--red-accent)] block mb-3">
              THE OTHER SIDE
            </span>
            <p className="font-mono text-[13px] text-[var(--text-secondary)] leading-[1.6]">
              {results.dissentCore}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DebatePanel;
