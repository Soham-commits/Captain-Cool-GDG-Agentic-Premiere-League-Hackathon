const fs = require('fs');
let content = fs.readFileSync('frontend/src/components/DebatePanel.tsx', 'utf8');

// Replace standard agents borderLeft 3px to 4px
content = content.replace(
  /borderLeft: `3px solid \$\{agent\.accentColor\}`/,
  'borderLeft: `4px solid ${agent.accentColor}`'
);

// Replace Commentator card
content = content.replace(
  /<div className="card-style p-\[32px\] mt-4 w-full" style=\{\{ borderLeft: `3px solid \$\{commentator\.accentColor\}` \}\}>/,
  '<div className="card-style p-[32px] mt-4 w-full relative" style={{ borderLeft: "4px solid", borderImage: "linear-gradient(180deg, #1a73e8, #00c853, #f9ab00, #ea4335) 1" }}>'
);

fs.writeFileSync('frontend/src/components/DebatePanel.tsx', content, 'utf8');
