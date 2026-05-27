import { Link } from 'react-router-dom';
import TechStackStrip from '../components/TechStackStrip';

const Landing = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero */}
      <section className="w-full max-w-5xl text-center py-20 px-4">
        <h1 className="text-5xl font-bold mb-6 text-white">
          Meet <span className="text-primary">Captain Cool</span>
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          A multi-agent IPL match strategist built on Google Gemini + Google ADK.
          Experience the ultimate debate between stats, strategies, and cricket intuition.
        </p>
        <Link 
          to="/analyze" 
          className="bg-primary hover:bg-green-500 text-black font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-primary/50 transition-all text-lg"
        >
          Analyze a Match
        </Link>
      </section>

      {/* Tech Stack Strip */}
      <TechStackStrip />

      {/* How It Works */}
      <section className="w-full max-w-5xl py-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: '1', title: 'Context Gathering', desc: 'Inputs match context, weather, and ball-by-ball data.' },
            { step: '2', title: 'Agent Debate', desc: '5 specialized agents debate strategies, stats, and counterfactuals.' },
            { step: '3', title: 'Final Strategy', desc: 'Commentator synthesizes the debate into actionable insights.' }
          ].map((item) => (
            <div key={item.step} className="bg-card p-6 rounded-xl border border-gray-800 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xl font-bold mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Agent Cards (Roles) */}
      <section className="w-full max-w-5xl py-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">The Strategists</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {['Stats Analyst', 'Strategist', 'Devil\'s Advocate', 'Strategist Round 2', 'Commentator'].map(agent => (
            <div key={agent} className="bg-card p-6 rounded-xl border border-gray-800 w-64">
              <h3 className="text-lg font-bold text-accent mb-2">{agent}</h3>
              <p className="text-sm text-gray-400">Specialized AI agent powered by Gemini, designed for specific match analysis tasks.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landing;
