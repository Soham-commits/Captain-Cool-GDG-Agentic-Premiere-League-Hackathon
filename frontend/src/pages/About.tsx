import { useState } from 'react';

const agentRoles = [
  {
    name: 'Stats Analyst',
    color: 'var(--blue)',
    oneliner: 'Crunches numbers, historical data, and win probabilities.',
    details: 'Leveraging massive datasets and real-time form indicators, this agent ensures that all subsequent debate is anchored in statistical reality rather than gut feeling alone. It calculates optimal strike rates, boundary probabilities, and provides projected edge.'
  },
  {
    name: 'Strategist',
    color: 'var(--green)',
    oneliner: 'Proposes an initial tactical plan based on game state.',
    details: 'The primary decision maker. The Strategist synthesizes the stats with current resources, pitch conditions, and match context to form a definitive, actionable plan. It determines who should bowl, what lengths to target, and field placements.'
  },
  {
    name: "Devil's Advocate",
    color: 'var(--red)',
    oneliner: 'Challenges established strategies and exposes hidden risks.',
    details: 'Every good decision needs to survive extreme stress-testing. This agent actively looks for failure modes, phase blindness, and predictable patterns in the Strategist\'s plan. It forces the system to consider "what if everything goes wrong?"'
  },
  {
    name: 'Strategist Round 2',
    color: 'var(--yellow)',
    oneliner: 'Refines the initial strategy based on critiques.',
    details: 'Taking the feedback from the Devil\'s Advocate, this iteration of the Strategist rebuilds the call. It incorporates contingencies, safeguards, and backup plans to ensure the final strategy is robust against the identified edge cases.'
  },
  {
    name: 'Commentator',
    color: 'var(--purple-accent)',
    oneliner: 'Synthesizes the entire debate into a clear narrative.',
    details: 'The final voice. The Commentator takes the complex multi-agent debate and distills it into a confident, actionable match call. It surfaces the core dissent so you know what you are trading off, and provides counterfactual scenarios.'
  }
];

const About = () => {
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);

  return (
    <div className="w-full text-left bg-white text-[var(--black)] min-h-screen">
      <div className="max-w-[800px] mx-auto py-[96px] px-8">
        {/* HERO */}
        <div className="mb-[96px] relative">
          <div className="overline-text text-[var(--blue)] mb-6">APL 2026 SUBMISSION</div>
          <h1 className="text-[72px] md:text-[96px] font-[900] text-[#f1f3f4] leading-[0.8] tracking-[-3px] m-0 select-none">
            ABOUT
          </h1>
          <h2 className="absolute top-[40px] md:top-[50px] left-[10px] md:left-[20px] text-[40px] md:text-[56px] font-[800] text-[var(--blue)] tracking-[-2px] m-0 leading-none drop-shadow-sm">
            Captain Cool
          </h2>
          <p className="mt-[48px] text-[18px] text-[var(--text-muted)] leading-[1.8] max-w-[600px]">
            Built for the GDG Agentic Premiere League Hackathon, Captain Cool simulates a highly intelligent panel of cricket experts. By leveraging Google's Gemini models and ADK, it processes real-time context and simulates debating strategies to provide the ultimate match analysis.
          </p>
        </div>

        <div className="h-[1px] w-full bg-[#f1f3f4] my-[64px]" />

        {/* AGENT ROLES */}
        <div className="mb-[96px]">
          <h2 className="text-[32px] font-[800] text-[var(--black)] tracking-[-1px] mb-[32px]">Agent Roles</h2>
          
          <div className="flex flex-col gap-4">
            {agentRoles.map((agent) => {
              const isExpanded = expandedAgent === agent.name;
              return (
                <div 
                  key={agent.name} 
                  className="bg-white border-[2px] border-[#f1f3f4] rounded-[12px] p-[24px] cursor-pointer hover:shadow-sm transition-all"
                  style={{ borderLeft: `6px solid ${agent.color}` }}
                  onClick={() => setExpandedAgent(isExpanded ? null : agent.name)}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center flex-wrap gap-x-3 gap-y-1">
                      <span className="font-[700] text-[18px] text-[var(--black)]">{agent.name}</span>
                      <span className="text-[16px] text-gray-300 hidden sm:inline">|</span>
                      <span className="text-[15px] text-[var(--text-muted)]">{agent.oneliner}</span>
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="mt-4 text-[15px] text-[#5f6368] leading-[1.7] max-w-[650px]">
                      {agent.details}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="h-[1px] w-full bg-[#f1f3f4] my-[64px]" />

        {/* ARCHITECTURE */}
        <div className="mb-[96px]">
          <h2 className="text-[32px] font-[800] text-[var(--black)] tracking-[-1px] mb-[48px]">Architecture</h2>
          
          <div className="flex flex-col items-center gap-0 w-full max-w-[600px] mx-auto">
            <DiagramNode title="Match State Input" subtitle="Form / URL / Screenshot" border="var(--black)" />
            <Arrow />
            <DiagramNode title="Stats Analyst" subtitle="gemini-2.5-flash + 3 tools" border="var(--blue)" />
            <Arrow />
            <DiagramNode title="Strategist → Devil's Advocate → Strategist R2" subtitle="The debate loop" border="var(--green)" />
            <Arrow />
            <DiagramNode title="Commentator" subtitle="Final call + counterfactual" border="var(--purple-accent)" />
            <Arrow />
            <DiagramNode title="Decision Output" subtitle="Confidence score + dissent surfaced" border="var(--yellow)" />
          </div>
        </div>

        <div className="h-[1px] w-full bg-[#f1f3f4] my-[64px]" />

        {/* GITHUB LINK */}
        <div className="pb-[32px]">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-dark inline-block"
          >
            View on GitHub &uarr;
          </a>
        </div>
      </div>
    </div>
  );
};

const Arrow = () => (
  <div className="h-[40px] w-0 border-l-[3px] border-dashed border-[var(--blue)] my-[4px]" />
);

const DiagramNode = ({ title, subtitle, border }: { title: string; subtitle: string, border: string }) => (
  <div 
    className="w-full bg-white border border-[#dadce0] rounded-xl px-[24px] py-[20px] text-center shadow-sm"
    style={{ borderLeft: `6px solid ${border}` }}
  >
    <p className="text-[18px] text-[var(--black)] font-[700] m-0">{title}</p>
    <p className="mt-[6px] text-[14px] text-[var(--text-muted)] m-0">{subtitle}</p>
  </div>
);

export default About;
