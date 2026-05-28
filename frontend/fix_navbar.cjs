const fs = require('fs');

let content = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

content = content.replace(
  `  const navClass = onLanding && !isScrolled
    ? 'bg-[rgba(13,13,13,0.9)] border-transparent'
    : 'bg-[#0d0d0d] border-b border-[rgba(255,255,255,0.06)]';`,
  `  const navClass = onLanding 
    ? (isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent border-transparent')
    : 'bg-[#0d0d0d] border-b border-[rgba(255,255,255,0.06)]';`
);

fs.writeFileSync('src/components/Navbar.tsx', content, 'utf8');
