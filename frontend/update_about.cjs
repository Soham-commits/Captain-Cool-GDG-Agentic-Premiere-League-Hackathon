const fs = require('fs');
let content = fs.readFileSync('src/pages/About.tsx', 'utf8');

// Replace the DOM part that causes overlap
const oldHero = /<div className="mb-\[96px\] relative">[\s\S]*?<p className="mt-\[48px\] text-\[18px\] text-\[var\(--text-muted\)\] max-w-\[600px\] font-light leading-relaxed">/m;

const newHero = `<div className="mb-[96px] relative overflow-visible">
          {/* Watermark */}
          <h1 className="absolute -top-[20px] left-0 text-[100px] md:text-[140px] font-[900] text-[#f1f3f4] leading-[0.8] tracking-[-4px] m-0 select-none -z-10">
            ABOUT
          </h1>
          
          <div className="relative z-10 pt-[20px] md:pt-[40px]">
            <div className="overline-text text-[var(--blue)] mb-4">APL 2026 SUBMISSION</div>
            <h2 className="text-[48px] md:text-[72px] font-[900] text-[var(--blue)] tracking-[-2.5px] m-0 leading-[1.1] drop-shadow-sm">
              Captain Cool
            </h2>
            <p className="mt-[24px] text-[18px] text-[var(--text-muted)] max-w-[600px] font-medium leading-[1.7]">`;

content = content.replace(oldHero, newHero);
fs.writeFileSync('src/pages/About.tsx', content, 'utf8');
