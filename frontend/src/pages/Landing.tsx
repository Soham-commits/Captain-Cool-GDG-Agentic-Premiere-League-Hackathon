import { useEffect, useRef, useState } from 'react';
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
  const tensionSectionRef = useRef<HTMLElement | null>(null);
  const finalCtaSectionRef = useRef<HTMLElement | null>(null);
  const strategistSectionRef = useRef<HTMLElement | null>(null);
  const [showTensionContent, setShowTensionContent] = useState(false);
  const [showFinalCtaContent, setShowFinalCtaContent] = useState(false);
  const [visibleStrategistCards, setVisibleStrategistCards] = useState(0);

  useEffect(() => {
    const element = tensionSectionRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowTensionContent(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = finalCtaSectionRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowFinalCtaContent(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = strategistSectionRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let index = 0;
          setVisibleStrategistCards(0);

          const timer = window.setInterval(() => {
            index += 1;
            setVisibleStrategistCards(index);
            if (index >= strategistCards.length) {
              window.clearInterval(timer);
            }
          }, 100);

          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const revealClass = showTensionContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';
  const finalCtaRevealClass = showFinalCtaContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';

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
          <h1 className="text-[48px] md:text-6xl font-bold mb-6 text-white leading-tight">
            🏏 <span className="text-primary">Captain Cool</span>
            <span className="block text-3xl md:text-4xl text-textMain mt-4 font-semibold">- Multi-Agent IPL Match Strategist</span>
          </h1>
          <p className="text-xl text-textMain/85 mb-10 max-w-2xl mx-auto">
            A multi-agent IPL match strategist built on Google Gemini + Google ADK.
            Experience the ultimate debate between stats, strategies, and cricket intuition.
          </p>
          <Link 
            to="/analyze" 
            className="inline-block bg-primary hover:bg-primary/85 text-black font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-primary/50 transition-all text-lg cta-hover-glow"
          >
            Analyze a Match
          </Link>
        </div>
      </section>

      {/* Tech Stack Strip */}
      <TechStackStrip />

      {/* Tension Section */}
      <section
        ref={tensionSectionRef}
        className="relative w-full min-h-screen bg-background overflow-hidden flex items-center justify-center px-4"
      >
        <p className="absolute inset-0 grid place-items-center text-white/5 text-[72px] md:text-[120px] font-extrabold tracking-[0.08em] select-none pointer-events-none">
          19th OVER
        </p>

        <div className="relative z-10 text-center max-w-4xl">
          <h2
            className={`text-[36px] md:text-[48px] font-bold text-white leading-tight transition-all duration-700 ${revealClass}`}
            style={{ transitionDelay: '80ms' }}
          >
            200 decisions per match.
          </h2>
          <p
            className={`mt-6 text-[20px] md:text-[24px] text-[#9e9e9e] leading-relaxed transition-all duration-700 ${revealClass}`}
            style={{ transitionDelay: '260ms' }}
          >
            Each one in under 30 seconds.
            <br />
            One wrong call ends the season.
          </p>
        </div>
      </section>

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
      <section ref={strategistSectionRef} className="w-full max-w-5xl py-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">The Strategists</h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {strategistCards.map((agent, index) => (
            <div
              key={agent.name}
              className={`relative bg-card p-6 rounded-xl border border-white/10 transition-all duration-500 ${visibleStrategistCards > index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
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
        <p className="text-textMuted text-center mb-10">MI vs CSK over 18 demo scenario.</p>
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="bg-card border border-white/10 rounded-xl p-4 border-l-4" style={{ borderLeftColor: '#1565c0' }}>
            <h3 className="font-semibold text-sm mb-2">Stats Analyst</h3>
            <p className="font-mono text-xs text-textMuted whitespace-pre-line">Win Prob: 70.3% (CSK) - trending upwards.
Dhoni SR 121.4 vs career high-leverage 205+.
Anomaly: boundary cluster incoming.</p>
          </div>
          <div className="bg-card border border-white/10 rounded-xl p-4 border-l-4" style={{ borderLeftColor: '#00e676' }}>
            <h3 className="font-semibold text-sm mb-2">Strategist</h3>
            <p className="font-mono text-xs text-textMuted whitespace-pre-line">DECISION: Bumrah bowls the 19th. Hard lengths
into the body, wide-line yorkers at the death.
REASONING: The 19th over determines 82% of
outcomes at Wankhede...</p>
          </div>
          <div className="border border-[#ef5350]/40 rounded-xl p-4 border-l-4 bg-[#1a0a0a]" style={{ borderLeftColor: '#ef5350' }}>
            <h3 className="font-semibold text-sm mb-2 text-danger">Devil&apos;s Advocate</h3>
            <p className="font-mono text-xs text-[#c18a8a] whitespace-pre-line">PHASE BLINDNESS. Burning Bumrah in the 19th
ensures the 20th is decided by a bowler with
an 11.8 death economy...</p>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link
            to="/analyze"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/85 text-black font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Try It Live →
          </Link>
          <p className="text-textMuted text-sm mt-3">Real output. Real agents. Real debate.</p>
        </div>
      </section>

      {/* Final CTA */}
      <section
        ref={finalCtaSectionRef}
        className="w-full min-h-screen flex items-center justify-center px-4"
        style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #0f1923 100%)' }}
      >
        <div className={`text-center max-w-4xl transition-all duration-700 ${finalCtaRevealClass}`}>
          <p className="text-[44px] md:text-[64px] font-semibold italic text-white">Cricket is a captain&apos;s game.</p>
          <p className="text-[20px] md:text-[24px] text-[#9e9e9e] mt-5">We built the captain&apos;s second brain.</p>
          <Link
            to="/analyze"
            className="inline-block mt-10 bg-primary hover:bg-primary/85 text-black font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-primary/50 transition-all text-lg cta-hover-glow"
          >
            MAKE THE CALL →
          </Link>
          <p className="text-[#616161] mt-4 text-[14px]">Built for APL 2026. Powered by Gemini.</p>
        </div>
      </section>
    </div>
  );
};

export default Landing;
