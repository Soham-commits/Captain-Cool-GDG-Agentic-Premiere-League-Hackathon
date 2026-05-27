const About = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">About Captain Cool</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-primary">APL Submission Context</h2>
        <p className="text-gray-300 leading-relaxed">
          Built for the GDG Agentic Premiere League Hackathon, Captain Cool simulates a highly intelligent 
          panel of cricket experts. By leveraging Google's Gemini models and ADK, it processes real-time 
          context and simulates debating strategies to provide the ultimate match analysis.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-accent">Agent Roles</h2>
        <ul className="space-y-4 text-gray-300">
          <li><strong className="text-white">Stats Analyst:</strong> Crunches numbers, historical data, and win probabilities.</li>
          <li><strong className="text-white">Strategist:</strong> Looks at team composition, weather, and pitch conditions to propose an initial plan.</li>
          <li><strong className="text-white">Devil's Advocate:</strong> Challenges the established strategies, pointing out risks and alternative scenarios.</li>
          <li><strong className="text-white">Strategist Round 2:</strong> Refines the initial strategy based on the Devil's Advocate's critiques.</li>
          <li><strong className="text-white">Commentator:</strong> Synthesizes the entire debate into a clear, engaging final narrative.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Architecture</h2>
        <div className="bg-card p-6 rounded-xl border border-gray-800 font-mono text-sm text-gray-400">
          <p>[ User Input ] ➔ [ Orchestrator ]</p>
          <p className="pl-8">➔ [ Stats Analyst ] (Retrieves Cricbuzz & Weather Context)</p>
          <p className="pl-8">➔ [ Strategist ]</p>
          <p className="pl-8">➔ [ Devil's Advocate ] (Dissent & Risks)</p>
          <p className="pl-8">➔ [ Strategist Round 2 ]</p>
          <p className="pl-8">➔ [ Commentator ] (Final Output & Confidence)</p>
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

export default About;
