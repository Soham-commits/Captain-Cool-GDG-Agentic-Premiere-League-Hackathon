import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const Landing = () => {
  
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Autoplay/loop the background video for a live feel; keep it muted & inline for mobile.
    const tryPlay = async () => {
      try {
        await video.play();
      } catch (e) {
        // some browsers block autoplay; leaving muted and playsInline helps.
      }
    };

    tryPlay();

    return () => {
      // no-op cleanup
    };
  }, []);

  // Debug badge to surface video state for troubleshooting
  const [videoState, setVideoState] = useState({ readyState: 0, time: 0 });
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const id = setInterval(() => {
      setVideoState({ readyState: vid.readyState, time: Math.floor(vid.currentTime) });
    }, 500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full flex flex-col min-h-screen pt-16 lg:pt-0 overflow-x-hidden text-left text-[#f9ab00] bg-transparent on-video">
      <video
        ref={videoRef}
        src="/Stadium.mp4"
        className="fixed inset-0 w-full h-full object-cover z-0 opacity-100"
        preload="auto"
        muted
        playsInline
        autoPlay
        loop
        aria-hidden
        style={{ pointerEvents: 'none' }}
      />
      {/* background overlay removed to reveal video */}
      {/* debug badge removed */}
      {/* SECTION 1 - Hero */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-start px-8 lg:px-24 py-24 overflow-hidden">
        {/* decorative shapes removed to keep hero clear */}

        {/* Left Side Vertical Text */}
        <div className="absolute left-8 top-1/3 origin-bottom-left -rotate-90 text-white text-[11px] tracking-[3px] font-medium hidden lg:block whitespace-nowrap">
          MULTI-AGENT / IPL STRATEGIST / GOOGLE GEMINI
        </div>

        <div className="relative z-10 w-full max-w-3xl lg:ml-12 mt-12 glass-panel p-6 rounded-xl">
          {/* Main Hero Text */}
          <div className="flex flex-col">
            <h1 className="text-[112px] lg:text-[160px] font-[900] tracking-[-4px] leading-[0.9] text-google-blue m-0">
              CAPTAIN
            </h1>
            <h1 className="text-[112px] lg:text-[160px] font-[900] tracking-[-4px] leading-[0.9] text-[#f9ab00] m-0">
              COOL
            </h1>
          </div>

          {/* Stat Pills */}
          <div className="mt-[32px] flex flex-wrap gap-4">
            <span className="pill-stat bg-google-blue text-[#f9ab00] glass-card">5 AGENTS</span>
            <span className="pill-stat bg-google-blue text-[#f9ab00] glass-card">3 TOOLS</span>
            <span className="pill-stat bg-google-blue text-[#f9ab00] glass-card">GEMINI 2.5</span>
          </div>

          {/* CTA */}
          <div className="mt-[24px]">
            <Link to="/analyze" className="bg-[#ea4335]/80 hover:bg-[#ea4335] text-[#f9ab00] backdrop-blur-md border border-[#ea4335]/50 px-6 py-3 rounded-full font-bold inline-block hover:scale-[1.02] active:scale-[0.98] transition-transform">
              Analyze a Match →
            </Link>
          </div>
        </div>

        {/* Bottom Right Explore */}
        <div className="absolute bottom-8 right-8 text-[13px] text-white font-medium tracking-wide">
          EXPLORE &darr;
        </div>
      </section>

      {/* SECTION 2 - Problem */}
      <section className="relative w-full bg-transparent backdrop-blur-md bg-[#ea4335]/40 border-y border-[#f9ab00]/50 text-[#f9ab00] px-8 lg:px-24 py-32 overflow-hidden flex flex-col">
        {/* Floating shapes */}
        <div className="pill-shape bg-google-blue" style={{ width: '120px', height: '32px', top: '10%', right: '15%', transform: 'rotate(12deg)' }} />
        <div className="circle-shape bg-google-green" style={{ width: '60px', height: '60px', bottom: '15%', left: '8%' }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-8 items-start lg:items-center">
          <div className="w-full lg:w-1/2 flex flex-col">
            <span className="overline-text text-white mb-6">THE PROBLEM</span>
            <h2 className="text-[100px] lg:text-[160px] font-[900] leading-[0.85] tracking-[-2px] text-[#f9ab00] m-0">
              200
            </h2>
            <h2 className="text-[56px] lg:text-[80px] font-[900] leading-[1] tracking-[-2px] text-[#f9ab00] m-0">
              DECISIONS
            </h2>
            <h2 className="text-[56px] lg:text-[80px] font-[900] leading-[1] tracking-[-2px] text-white m-0">
              PER MATCH.
            </h2>
          </div>
          <div className="w-full lg:w-1/2 flex items-center lg:px-12">
            <p className="text-[18px] text-[#9e9e9e] leading-[1.8] max-w-[400px]">
              Each one in under 30 seconds.<br/>
              One wrong call ends the season.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 - How It Works */}
      <section className="w-full bg-white px-8 lg:px-24 py-32 flex flex-col">
        <div className="w-full max-w-7xl mx-auto">
          <span className="overline-text text-google-green mb-6 block">HOW IT WORKS</span>
          <h2 className="text-[48px] lg:text-[64px] font-[900] leading-[1.1] tracking-[-2px] text-[#1a1a1a] mb-16">
            Input. Debate.<br/>Decide.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative glass-card rounded-[16px] p-8 overflow-hidden">
              <div className="absolute -top-4 -right-4 text-[96px] font-[900] text-google-blue opacity-15 select-none leading-none">01</div>
              <h3 className="relative z-10 text-[20px] font-[700] text-[#1a1a1a] mb-4 mt-16">Provide Context</h3>
              <p className="relative z-10 text-[15px] text-white leading-[1.7]">
                Feed in match state, current over, ball events, and custom notes. Or use our screenshot tool.
              </p>
            </div>
            <div className="relative glass-card rounded-[16px] p-8 overflow-hidden">
              <div className="absolute -top-4 -right-4 text-[96px] font-[900] text-google-green opacity-15 select-none leading-none">02</div>
              <h3 className="relative z-10 text-[20px] font-[700] text-[#1a1a1a] mb-4 mt-16">Agents Debate</h3>
              <p className="relative z-10 text-[15px] text-white leading-[1.7]">
                Stats, Strategist, and Devil's Advocate argue internally to expose flaws in initial plans.
              </p>
            </div>
            <div className="relative glass-card rounded-[16px] p-8 overflow-hidden">
              <div className="absolute -top-4 -right-4 text-[96px] font-[900] text-google-yellow opacity-15 select-none leading-none">03</div>
              <h3 className="relative z-10 text-[20px] font-[700] text-[#1a1a1a] mb-4 mt-16">Actionable Output</h3>
              <p className="relative z-10 text-[15px] text-white leading-[1.7]">
                Commentator synthesizes the final strategy with confidence scores and counterfactuals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 - The Agents */}
      <section className="w-full bg-white px-8 lg:px-24 pb-32 flex flex-col">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-[48px] lg:text-[64px] font-[900] leading-[1.1] tracking-[-2px] mb-12">
            <span className="text-[#1a1a1a]">FIVE </span>
            <span className="text-google-blue">AGENTS.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Stats */}
            <div className="bg-white border-[2px] border-[#f1f3f4] rounded-[16px] p-6 hover:border-google-blue hover:-translate-y-1 transition-all flex flex-col justify-between h-[200px]">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[32px] leading-none">📊</span>
                  <span className="bg-[#f1f3f4] text-[#1a1a1a] text-[10px] uppercase font-bold tracking-wide px-3 py-1 rounded-full">gemini-2.5-flash</span>
                </div>
                <h4 className="text-[16px] font-[700] text-[#1a1a1a] mb-1">Stats Analyst</h4>
                <p className="text-[13px] text-white">Crunches historical data & win probs.</p>
              </div>
              <div><span className="bg-google-blue text-[#f9ab00] text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">INTELLIGENCE</span></div>
            </div>

            {/* Strategist */}
            <div className="bg-white border-[2px] border-[#f1f3f4] rounded-[16px] p-6 hover:border-google-green hover:-translate-y-1 transition-all flex flex-col justify-between h-[200px]">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[32px] leading-none">🧠</span>
                  <span className="bg-google-blue text-[#f9ab00] text-[10px] uppercase font-bold tracking-wide px-3 py-1 rounded-full">gemini-2.5-pro</span>
                </div>
                <h4 className="text-[16px] font-[700] text-[#1a1a1a] mb-1">Strategist</h4>
                <p className="text-[13px] text-white">Builds primary tactical plans.</p>
              </div>
              <div><span className="bg-google-green text-[#f9ab00] text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">DECISION</span></div>
            </div>

            {/* Devil */}
            <div className="bg-white border-[2px] border-[#f1f3f4] rounded-[16px] p-6 hover:border-google-red hover:-translate-y-1 transition-all flex flex-col justify-between h-[200px]">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[32px] leading-none">⚔️</span>
                  <span className="bg-[#f1f3f4] text-[#1a1a1a] text-[10px] uppercase font-bold tracking-wide px-3 py-1 rounded-full">gemini-2.5-flash</span>
                </div>
                <h4 className="text-[16px] font-[700] text-[#1a1a1a] mb-1">Devil's Advocate</h4>
                <p className="text-[13px] text-white">Challenges strategies, identifies risks.</p>
              </div>
              <div><span className="bg-google-red text-[#f9ab00] text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">CHALLENGE</span></div>
            </div>

            {/* Strategist 2 */}
            <div className="bg-white border-[2px] border-[#f1f3f4] rounded-[16px] p-6 hover:border-google-yellow hover:-translate-y-1 transition-all flex flex-col justify-between h-[200px]">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[32px] leading-none">🔄</span>
                  <span className="bg-google-blue text-[#f9ab00] text-[10px] uppercase font-bold tracking-wide px-3 py-1 rounded-full">gemini-2.5-pro</span>
                </div>
                <h4 className="text-[16px] font-[700] text-[#1a1a1a] mb-1">Strategist Round 2</h4>
                <p className="text-[13px] text-white">Refines response after critique.</p>
              </div>
              <div><span className="bg-google-yellow text-[#f9ab00] text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">REVISION</span></div>
            </div>

            {/* Commentator */}
            <div className="bg-white border-[2px] border-[#f1f3f4] rounded-[16px] p-6 hover:border-[var(--purple-accent)] hover:-translate-y-1 transition-all flex flex-col justify-between h-[200px]">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[32px] leading-none">🎙️</span>
                  <span className="bg-[#f1f3f4] text-[#1a1a1a] text-[10px] uppercase font-bold tracking-wide px-3 py-1 rounded-full">gemini-2.5-flash</span>
                </div>
                <h4 className="text-[16px] font-[700] text-[#1a1a1a] mb-1">Commentator</h4>
                <p className="text-[13px] text-white">Final verdict and narrative synthesis.</p>
              </div>
              <div><span className="bg-google-purple text-[#f9ab00] text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--purple-accent)' }}>NARRATIVE</span></div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5 - Sample Output */}
      <section className="w-full bg-[#f9ab00]/40 px-8 lg:px-24 py-32 flex flex-col items-center">
        <h2 className="text-[40px] lg:text-[56px] font-[800] text-[#1a1a1a] tracking-[-1.5px] mb-2 text-center">
          See it in action.
        </h2>
        <p className="text-[20px] lg:text-[24px] text-white mb-16 text-center">
          MI vs CSK. Over 18. Dhoni on strike.
        </p>

          <div className="w-full max-w-[800px] flex flex-col gap-4">
          <div className="glass-card rounded-r-[12px] border-l-[4px] border-google-blue p-6 lg:p-8 shadow-sm">
            <div className="text-[11px] font-[600] uppercase tracking-[2px] text-google-blue mb-3">STATS ANALYST</div>
            <p className="font-mono text-[14px] leading-[1.8] text-[#1a1a1a]">
              "Dhoni SR vs Pace off: 145. SR vs Yorker: 92. Projected edge heavily favors wide yorkers over cutters."
            </p>
          </div>
          <div className="glass-card rounded-r-[12px] border-l-[4px] border-google-red p-6 lg:p-8 shadow-sm relative ml-0 lg:ml-12">
            <div className="text-[11px] font-[600] uppercase tracking-[2px] text-google-red mb-3">DEVIL'S ADVOCATE</div>
            <p className="font-mono text-[14px] leading-[1.8] text-[#1a1a1a]">
              "Miss a wide yorker and it's a guaranteed boundary given point is up. He is anticipating the wide line. Don't be predictable."
            </p>
          </div>
          <div className="glass-card rounded-r-[12px] border-l-[4px] border-google-green p-6 lg:p-8 shadow-sm">
            <div className="text-[11px] font-[600] uppercase tracking-[2px] text-google-green mb-3">STRATEGIST R2</div>
            <p className="font-mono text-[14px] leading-[1.8] text-[#1a1a1a]">
              "Adjust field: push third man deep. Bowl hard length at the body first ball to jam him, then wide yorker once he shifts weight."
            </p>
          </div>
        </div>

        <div className="mt-16">
          <Link to="/analyze" className="bg-[#0d0d0d] text-[#f9ab00] rounded-full px-8 py-3.5 text-[15px] font-[600] hover:bg-google-blue transition-colors">
            Try it live →
          </Link>
        </div>
      </section>

      {/* SECTION 6 - Tech Stack */}
      <section className="w-full bg-white px-8 lg:px-24 py-32 flex flex-col items-center">
        <span className="text-[11px] font-[600] uppercase tracking-[2px] text-white mb-8">BUILT ON</span>
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
          <span className="btn-pill-outline">React</span>
          <span className="btn-pill-outline">Tailwind</span>
          <span className="btn-pill-outline">Gemini 2.5 Pro</span>
          <span className="btn-pill-outline">Gemini 2.5 Flash</span>
          <span className="btn-pill-outline">Agentic Design Kit (ADK)</span>
        </div>
        <p className="text-[12px] text-[#9e9e9e] mt-12">
          Zero OpenAI. Zero Anthropic. Pure Google.
        </p>
      </section>

      {/* SECTION 7 - Final CTA */}
      <section className="relative w-full h-[80vh] min-h-[600px] bg-[#0d0d0d] px-8 py-32 flex flex-col items-center justify-center overflow-hidden">
        {/* Floating Shapes */}
        <div className="circle-shape bg-google-blue opacity-80" style={{ width: '300px', height: '300px', bottom: '-100px', right: '-100px' }} />
        <div className="pill-shape bg-google-green opacity-90" style={{ width: '120px', height: '30px', top: '15%', left: '10%', transform: 'rotate(-15deg)' }} />

        <div className="relative z-10 flex flex-col items-center text-center">
          <h2 className="text-[48px] lg:text-[64px] font-[300] italic text-[#f9ab00] m-0 leading-tight">
            Cricket is a
          </h2>
          <h2 className="text-[48px] lg:text-[64px] font-[900] text-google-blue m-0 leading-tight tracking-[-1.5px]">
            captain's game.
          </h2>
          
          <p className="text-[18px] lg:text-[20px] text-[#9e9e9e] mt-6 mb-12">
            We built the captain's second brain.
          </p>

          <Link to="/analyze" className="bg-white text-[#f9ab00] rounded-full px-12 py-4 text-[18px] font-[700] hover:bg-google-blue hover:text-[#f9ab00] transition-all">
            Make the Call →
          </Link>

          <p className="text-[12px] text-white mt-12 pt-8">
            Built for APL 2026 · Powered by Google Gemini
          </p>
        </div>
      </section>

    </div>
  );
};

export default Landing;
