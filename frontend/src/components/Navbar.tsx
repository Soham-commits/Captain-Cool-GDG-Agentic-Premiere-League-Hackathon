import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onLanding = location.pathname === '/';
  const navClass = onLanding 
    ? (isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent border-transparent')
    : 'bg-[#0d0d0d] border-b border-[rgba(255,255,255,0.06)]';

  const isAnalyze = location.pathname === '/analyze';
  const isAbout = location.pathname === '/about';

  return (
    <nav className={`sticky top-4 z-50 w-full transition-all duration-300 ${navClass}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-center h-24 relative px-6">
        {/* Centered nav pill (keeps center across pages) */}
        <div className="nav-pill" style={{ padding: '16px 28px' }}>
          <Link to="/" className="brand text-xl font-bold">Captain Cool</Link>
          <Link to="/" className="hidden md:inline-block text-base ml-6 hover:underline">Home</Link>
          <Link to="/analyze" className="hidden md:inline-block text-base ml-6 hover:underline">Analyze</Link>
          <Link to="/about" className="hidden md:inline-block text-base ml-6 hover:underline">About</Link>
        </div>

        {/* Mobile menu button on the right */}
        <div className="absolute right-4">
          <button
            type="button"
            className="md:hidden text-[#9e9e9e] border border-white/20 rounded-md px-3 py-1"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            ☰
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden max-w-7xl mx-auto mt-3 rounded-lg border border-white/10 bg-[#0d0d0d] p-3 flex flex-col gap-2 text-white">
          <Link
            to="/analyze"
            className="px-3 py-2 rounded-md hover:bg-white/5 hover:text-white transition-colors"
          >
            Analyze
          </Link>
          <Link
            to="/about"
            className="px-3 py-2 rounded-md hover:bg-white/5 hover:text-white transition-colors"
          >
            About
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
