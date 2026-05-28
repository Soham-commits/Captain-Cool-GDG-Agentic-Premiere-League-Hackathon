const fs = require('fs');

let content = fs.readFileSync('src/pages/Landing.tsx', 'utf8');

// Replace the CTA button in Section 4
content = content.replace(
  'className="btn-pill-outline border-white/30 text-white hover:bg-white/20 hover:text-white mt-8 px-8 py-4 text-[16px] font-bold"',
  'className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 rounded-full mt-8 px-8 py-4 text-[16px] font-bold transition-colors inline-block"'
);

fs.writeFileSync('src/pages/Landing.tsx', content, 'utf8');
