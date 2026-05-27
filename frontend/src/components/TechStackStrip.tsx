const TechStackStrip = () => {
  const tech = ['React 18', 'TypeScript', 'Tailwind CSS', 'Google Gemini', 'Google ADK', 'FastAPI'];
  return (
    <div className="w-full bg-gray-900 border-y border-gray-800 py-6 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-8 text-gray-500 font-mono text-sm">
        {tech.map((t, i) => (
          <span key={i} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechStackStrip;
