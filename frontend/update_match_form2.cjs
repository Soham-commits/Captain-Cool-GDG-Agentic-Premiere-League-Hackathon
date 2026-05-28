const fs = require('fs');
let content = fs.readFileSync('src/components/MatchInputForm.tsx', 'utf8');

// Undo the section color styling
content = content.replace(
  /<h3 className="text-\[10px\] uppercase tracking-\[2px\] mb-4" style=\{\{ color: '.*?' \}\}>/g,
  '<h3 className="text-[10px] font-[700] uppercase tracking-[2px] text-[#9e9e9e] mb-4">'
);
content = content.replace(
  /className="pb-2 text-\[15px\] transition-colors relative text-\[#f5f5f5\] font-semibold"/g,
  'className="pb-2 text-[15px] transition-colors relative text-white font-[600]"'
);

// Form / Url / Screenshot tabs underlining
content = content.replace(
  /className="absolute bottom-\[-1px\] left-0 w-full h-\[2px\] bg-\[var\(--green-primary\)\]"/g,
  'className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-white"'
);

// Match context input style
content = content.replace(
  /w-full bg-\[#1c1c1e\] border border-\[rgba\(255,255,255,0\.08\)\]/g,
  'w-full bg-[#1b1b1b] border border-[rgba(255,255,255,0.06)]'
);

content = content.replace(
  /text-\[#f5f5f5\] text-\[14px\] focus:border-\[rgba\(0,230,118,0\.4\)\]/g,
  'text-[#e1e3e1] text-[14px] focus:border-[rgba(255,255,255,0.2)]'
);

content = content.replace(
  /text-\[var\(--text-primary\)\]/g,
  'text-white'
);

fs.writeFileSync('src/components/MatchInputForm.tsx', content, 'utf8');
