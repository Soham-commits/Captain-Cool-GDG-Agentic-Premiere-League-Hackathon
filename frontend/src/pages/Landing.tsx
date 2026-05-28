import { Link } from 'react-router-dom';
import TechStackStrip from '../components/TechStackStrip';

const strategistCards = [
  {
    name: 'Stats Analyst',
    accent: '#1565c0',
    model: 'gemini-2.5-flash',
    modelBg: '#424242',
    blurb: 'Win rates, matchup trends, pressure-over math in seconds.',
  },
  {
    name: 'Strategist',
    accent: '#00e676',
    model: 'gemini-2.5-pro',
    modelBg: '#ff6d00',
    blurb: 'Primary tactical plan tuned to game state and resources left.',
  },
  {
    name: "Devil's Advocate",
    accent: '#ef5350',
    model: 'gemini-2.5-flash',
    modelBg: '#424242',
    blurb: 'Punches holes in safe logic and exposes hidden downside.',
  },
  {
    name: 'Strategist Round 2',
    accent: '#ff8f00',
    model: 'gemini-2.5-pro',
    modelBg: '#ff6d00',
    blurb: 'Rebuilds the call after stress-testing edge-case outcomes.',
  },
  {
    name: 'Commentator',
    accent: '#7b1fa2',
    model: 'gemini-2.5-flash',
    modelBg: '#424242',
    blurb: 'Turns the debate into one clear, confident match call.',
  },
];

const Landing = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero */}
      <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/Stadium.mp4" type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 to-black/90 z-[1]"></div>
        
        {/* Content */}
        <div className="relative z-10 w-full max-w-5xl py-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
            🏏 <span className="text-primary">Captain Cool</span>
            <span className="block text-3xl md:text-4xl text-textMain mt-4 font-semibold">- Multi-Agent IPL Match Strategist</span>
          </h1>
          <p className="text-xl text-textMain/85 mb-10 max-w-2xl mx-auto">
            A multi-agent IPL match strategist built on Google Gemini + Google ADK.
            Experience the ultimate debate between stats, strategies, and cricket intuition.
          </p>
          <Link 
            to="/analyze" 
            className="inline-block bg-primary hover:bg-primary/85 text-black font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-primary/50 transition-all text-lg"
          >
            Analyze a Match
          </Link>
        </div>
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
            <div key={item.step} className="bg-card p-6 rounded-xl border border-white/10 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xl font-bold mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-textMuted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Agent Cards (Roles) */}
      <section className="w-full max-w-5xl py-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">The Strategists</h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {strategistCards.map((agent) => (
            <div
              key={agent.name}
              className="relative bg-card p-6 rounded-xl border border-white/10"
              style={{ borderLeft: `4px solid ${agent.accent}` }}
            >
              <span
                className="absolute top-4 right-4 px-2.5 py-1 text-xs rounded-full font-semibold text-white"
                style={{ backgroundColor: agent.modelBg }}
              >
                {agent.model}
              </span>
              <h3 className="text-lg font-bold text-textMain mb-2 pr-28">{agent.name}</h3>
              <p className="text-sm text-textMuted">{agent.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Preview */}
      <section className="w-full max-w-5xl py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-3">See It In Action</h2>
        <p className="text-textMuted text-center mb-10">MI vs CSK, over 18, death overs pressure simulation.</p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-card border border-white/10 rounded-xl p-4 border-l-4" style={{ borderLeftColor: '#1565c0' }}>
            <h3 className="font-semibold text-sm mb-2">Stats Analyst</h3>
            <p className="font-mono text-xs text-textMuted">MI score 156/3 after 18. Historical win chance: 61% if yorker execution holds.</p>
          </div>
          <div className="bg-card border border-white/10 rounded-xl p-4 border-l-4" style={{ borderLeftColor: '#00e676' }}>
            <h3 className="font-semibold text-sm mb-2">Strategist</h3>
            <p className="font-mono text-xs text-textMuted">Hold Bumrah for over 20. Use pace-off into long boundary now, deny helicopter arc.</p>
          </div>
          <div className="border border-[#ef5350]/40 rounded-xl p-4 border-l-4 bg-[#1a0a0a]" style={{ borderLeftColor: '#ef5350' }}>
            <h3 className="font-semibold text-sm mb-2 text-danger">Devil&apos;s Advocate</h3>
            <p className="font-mono text-xs text-[#c18a8a]">One mistimed slower ball and Dhoni flips momentum. Keep third man fine, don&apos;t over-stack leg.</p>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link
            to="/analyze"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/85 text-black font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Try it live -&gt;
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative w-full min-h-screen flex items-center justify-center px-4 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/Stadium.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-background" />
        <div className="relative z-10 text-center max-w-4xl">
          <p className="text-4xl md:text-6xl font-semibold italic text-textMain">Cricket is a captain&apos;s game.</p>
          <p className="text-xl md:text-2xl text-textMuted mt-5">We built the captain&apos;s second brain.</p>
          <Link
            to="/analyze"
            className="inline-flex mt-10 bg-primary text-black font-bold text-lg px-8 py-4 rounded-lg hover:bg-primary/85 transition-colors"
          >
            MAKE THE CALL -&gt;
          </Link>
          <p className="text-textMuted mt-4 text-sm">Built for APL 2026. Powered by Gemini.</p>
        </div>
      </section>
    </div>
  );
};

export default Landing;
