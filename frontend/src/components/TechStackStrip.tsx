const stackItems = [
  { name: 'Google Gemini 2.5', mark: 'G', color: 'bg-[#1a73e8]' },
  { name: 'Google ADK', mark: 'A', color: 'bg-[#34a853]' },
  { name: 'Vertex AI', mark: 'V', color: 'bg-[#4285f4]' },
  { name: 'Firebase Studio', mark: 'F', color: 'bg-[#f9ab00]' },
  { name: 'Google AI Studio', mark: 'S', color: 'bg-[#ea4335]' },
];

const TechStackStrip = () => {
  return (
    <div className="w-full bg-[#0b1118] border-y border-white/10 py-6 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-4 md:gap-6 font-mono text-sm">
        {stackItems.map((item) => (
          <div
            key={item.name}
            className="group flex items-center gap-3 rounded-full border border-white/10 bg-card/70 px-4 py-2 transition-all hover:border-primary/70 hover:bg-card"
          >
            <span
              className={`h-8 w-8 rounded-full ${item.color} text-black font-bold grid place-items-center filter grayscale group-hover:grayscale-0 transition`}
            >
              {item.mark}
            </span>
            <span className="text-textMuted transition-colors group-hover:text-textMain">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStackStrip;
