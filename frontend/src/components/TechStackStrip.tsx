const stackItems = [
  "Google Gemini 2.5",
  "Google ADK",
  "Vertex AI",
  "Firebase Studio",
  "Google AI Studio"
];

const TechStackStrip = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="overline-label mb-6 text-[var(--text-muted)] text-center">BUILT ENTIRELY ON</div>
      <div className="max-w-[1200px] w-full px-4 flex flex-wrap justify-center gap-4">
        {stackItems.map((item) => (
          <div
            key={item}
            className="rounded-[100px] border border-[rgba(255,255,255,0.08)] px-[20px] py-[8px] text-[13px] text-[var(--text-secondary)] transition-colors hover:border-[rgba(255,255,255,0.2)] hover:text-[var(--text-primary)]"
          >
            {item}
          </div>
        ))}
      </div>
      <div className="text-[12px] text-[var(--text-muted)] mt-5 text-center">
        Zero OpenAI. Zero Anthropic.
      </div>
    </div>
  );
};

export default TechStackStrip;
