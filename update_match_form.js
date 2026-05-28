const fs = require('fs');
let content = fs.readFileSync('frontend/src/components/MatchInputForm.tsx', 'utf8');

// Section labels styling
// Change class for Section Label
const sectionMappings = [
  { match: "MATCH SITUATION", color: "#1a73e8" },
  { match: "SCORE", color: "#00c853" },
  { match: "PLAYERS", color: "#f9ab00" },
  { match: "BOWLING ATTACK", color: "#ea4335" },
  { match: "CONDITIONS", color: "#9c27b0" },
  { match: "TACTICAL", color: "#ff6d00" },
];

let replaced = content;
sectionMappings.forEach(sec => {
  const regex = new RegExp(`(<h3 className="text-\\[14px\\] font-semibold uppercase tracking-\\[1px\\] text-\\[var\\(--green-primary\\)\\] mb-4">)([^<]*${sec.match}[^<]*)(</h3>)`, "g");
  replaced = replaced.replace(regex, `<h3 className="text-[10px] uppercase tracking-[2px] mb-4" style={{ color: '${sec.color}' }}>$2</h3>`);
});

// Submit Button styling
replaced = replaced.replace(
  /className="w-full btn-primary bg-\[var\(--green-primary\)\] text-\[#000000\] hover:bg-\[#00c853\] hover:text-\[#000000\] py-4 text-\[14px\] font-bold mt-4 border-none"/g,
  `className="w-full text-white py-4 text-[14px] font-[700] mt-4 border-none transition-opacity hover:opacity-90"`
);

// We need to add styling for button inside the tag
replaced = replaced.replace(
  /<button\s+onClick=\{handleSubmit\}\s+disabled=\{isLoading\}\s+className="w-full text-white py-4 text-\[14px\] font-\[700\] mt-4 border-none transition-opacity hover:opacity-90"/g,
  `<button onClick={handleSubmit} disabled={isLoading} className="w-full text-white py-4 text-[14px] font-[700] mt-4 border-none rounded-full transition-opacity hover:opacity-90" style={{ background: 'linear-gradient(135deg, #1a73e8, #00c853)' }}`
);

fs.writeFileSync('frontend/src/components/MatchInputForm.tsx', replaced, 'utf8');
