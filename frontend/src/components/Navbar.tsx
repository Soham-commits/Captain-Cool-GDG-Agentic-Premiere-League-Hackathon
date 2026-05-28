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
    <nav className={`sticky top-0 z-50 p-4 transition-all duration-300 ${navClass}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-[#e1e3e1] hover:text-white transition-colors">
          Captain Cool
        </Link>

        <button
          type="button"
          className="md:hidden text-[#9e9e9e] border border-white/20 rounded-md px-3 py-1"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          ☰
        </button>

        <div className="hidden md:flex gap-6 items-center">
          <Link 
            to="/analyze" 
            className={`text-[15px] transition-colors ${isAnalyze ? 'text-white border border-[rgba(255,255,255,0.2)] rounded-full px-4 py-1.5' : 'text-[#9e9e9e] hover:text-white'}`}
          >
            Analyze
          </Link>
          <Link 
            to="/about" 
            className={`text-[15px] transition-colors ${isAbout ? 'text-white border border-[rgba(255,255,255,0.2)] rounded-full px-4 py-1.5' : 'text-[#9e9e9e] hover:text-white'}`}
          >
            About
          </Link>
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
