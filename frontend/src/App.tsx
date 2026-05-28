import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import Analyze from './pages/Analyze';
import About from './pages/About';
import Navbar from './components/Navbar';

const Footer = () => (
  <footer className="border-t border-white/10 bg-[#0b0b0b] px-4 py-6 text-sm text-textMuted">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
      <p>Captain Cool - Built for APL 2026 | Powered by Google Gemini</p>
      <a href="https://github.com" target="_blank" rel="noreferrer" className="text-primary hover:underline">
        GitHub
      </a>
    </div>
  </footer>
);

const AppShell = () => {
  const location = useLocation();
  const [transitionKey, setTransitionKey] = useState(location.pathname);

  useEffect(() => {
    setTransitionKey(location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-textMain flex flex-col">
      <Navbar />
      <main key={transitionKey} className="flex-grow animate-[fadeIn_240ms_ease-out]">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
