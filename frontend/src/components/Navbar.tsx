import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-card border-b border-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-primary">
          Captain Cool
        </Link>
        <div className="flex gap-6">
          <Link to="/analyze" className="hover:text-primary transition-colors">
            Analyze
          </Link>
          <Link to="/about" className="hover:text-primary transition-colors">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
