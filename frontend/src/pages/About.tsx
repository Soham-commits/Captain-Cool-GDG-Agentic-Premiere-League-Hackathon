const About = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">About Captain Cool</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-primary">APL Submission Context</h2>
        <p className="text-textMain/90 leading-relaxed">
          Built for the GDG Agentic Premiere League Hackathon, Captain Cool simulates a highly intelligent 
          panel of cricket experts. By leveraging Google's Gemini models and ADK, it processes real-time 
          context and simulates debating strategies to provide the ultimate match analysis.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-accent">Agent Roles</h2>
        <ul className="space-y-4 text-textMain/90">
          <li><strong className="text-textMain">Stats Analyst:</strong> Crunches numbers, historical data, and win probabilities.</li>
          <li><strong className="text-textMain">Strategist:</strong> Looks at team composition, weather, and pitch conditions to propose an initial plan.</li>
          <li><strong className="text-textMain">Devil's Advocate:</strong> Challenges the established strategies, pointing out risks and alternative scenarios.</li>
          <li><strong className="text-textMain">Strategist Round 2:</strong> Refines the initial strategy based on the Devil's Advocate's critiques.</li>
          <li><strong className="text-textMain">Commentator:</strong> Synthesizes the entire debate into a clear, engaging final narrative.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Architecture</h2>
        <div className="overflow-x-auto">
          <div className="min-w-[320px] bg-card p-6 rounded-xl border border-white/10">
            <div className="flex flex-col items-center gap-4">
              <DiagramNode title="Match State Input" subtitle="Form / URL / Screenshot" color="#424242" />
              <Arrow />
              <DiagramNode title="Stats Analyst" subtitle="gemini-2.5-flash + 3 tools" color="#1565c0" />
              <Arrow />
              <DiagramNode title="Strategist → Devil's Advocate → Strategist R2" subtitle="The debate loop" color="#00e676" />
              <Arrow />
              <DiagramNode title="Commentator" subtitle="Final call + counterfactual" color="#7b1fa2" />
              <Arrow />
              <DiagramNode title="Decision Output" subtitle="Confidence score + dissent surfaced" color="#ff6d00" />
            </div>
          </div>
        </div>
      </section>

      <a 
        href="https://github.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-primary hover:underline"
      >
        View on GitHub ↗
      </a>
    </div>
  );
};

const Arrow = () => <div className="h-8 w-[2px] bg-primary" />;

const DiagramNode = ({ title, subtitle, color }: { title: string; subtitle: string; color: string }) => (
  <div className="w-full rounded-xl border border-white/10 px-4 py-4 text-center shadow-lg" style={{ backgroundColor: '#0f1923', borderLeft: `4px solid ${color}` }}>
    <p className="text-textMain font-semibold">{title}</p>
    <p className="mt-1 text-sm text-textMuted">{subtitle}</p>
  </div>
);

export default About;
