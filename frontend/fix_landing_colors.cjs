const fs = require('fs');

let content = fs.readFileSync('src/pages/Landing.tsx', 'utf8');

// 1. Remove the solid background that's hiding the video
content = content.replace(
  'text-white bg-[#0a0a0a]',
  'text-[#f9ab00] bg-transparent'
);

// 2. Change the black overlay to a blue one
content = content.replace(
  'bg-black/70 backdrop-blur-[4px]',
  'bg-[#1a73e8]/40 backdrop-blur-[2px] mix-blend-multiply'
);

// 3. Replace all text-white with Google Yellow/Blue/Red
content = content.replace(/text-white/g, 'text-[#f9ab00]');
content = content.replace(/text-gray-300/g, 'text-[#00c853]');

// 4. Replace glassmorphism white/black bg's with colored ones
content = content.replace(/bg-black\/30/g, 'bg-[#ea4335]/40');
content = content.replace(/bg-white\/5/g, 'bg-[#34a853]/40');
content = content.replace(/bg-black\/40/g, 'bg-[#1a73e8]/40');
content = content.replace(/bg-white\/10/g, 'bg-[#f9ab00]/40');
content = content.replace(/bg-white\/20/g, 'bg-[#ea4335]/80');
content = content.replace(/hover:bg-white\/30/g, 'hover:bg-[#ea4335]');

// 5. Replace borders with colored variants
content = content.replace(/border-white\/10/g, 'border-[#f9ab00]/50');
content = content.replace(/border-white\/30/g, 'border-[#ea4335]/50');
content = content.replace(/shadow-black\/50/g, 'shadow-[#1a73e8]/50');

fs.writeFileSync('src/pages/Landing.tsx', content, 'utf8');
