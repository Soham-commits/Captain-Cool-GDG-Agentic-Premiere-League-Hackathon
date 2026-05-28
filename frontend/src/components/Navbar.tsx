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
  const navClass = onLanding && !isScrolled
    ? 'bg-transparent border-transparent'
    : 'bg-[#111111]/90 border-white/10 backdrop-blur-md';

  return (
    <nav className={`sticky top-0 z-50 border-b p-4 transition-all duration-300 ${navClass}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-primary">
          Captain Cool
        </Link>

        <button
          type="button"
          className="md:hidden text-textMain border border-white/20 rounded-md px-3 py-1"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          ☰
        </button>

        <div className="hidden md:flex gap-6 text-textMain">
          <Link to="/analyze" className="hover:text-primary transition-colors">
            Analyze
          </Link>
          <Link to="/about" className="hover:text-primary transition-colors">
            About
          </Link>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden max-w-7xl mx-auto mt-3 rounded-lg border border-white/10 bg-[#111111]/95 backdrop-blur-md p-3 flex flex-col gap-2 text-textMain">
          <Link
            to="/analyze"
            className="px-3 py-2 rounded-md hover:bg-white/5 hover:text-primary transition-colors"
          >
            Analyze
          </Link>
          <Link
            to="/about"
            className="px-3 py-2 rounded-md hover:bg-white/5 hover:text-primary transition-colors"
          >
            About
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
