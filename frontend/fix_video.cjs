const fs = require('fs');

let content = fs.readFileSync('src/pages/Landing.tsx', 'utf8');

// Fix the Landing container to be dark
content = content.replace(
  '<div className="w-full flex flex-col pt-16 lg:pt-0 overflow-x-hidden text-left text-white">',
  '<div className="w-full flex flex-col min-h-screen pt-16 lg:pt-0 overflow-x-hidden text-left text-white bg-[#0a0a0a]">'
);

// Fix the video so it renders correctly
content = content.replace(
  /className="fixed top-0 left-0 w-\[100vw\] h-\[100vh\] object-cover -z-50 opacity-40 mix-blend-screen bg-black"/,
  'className="fixed top-0 left-0 w-full h-full object-cover -z-50 opacity-100"'
);

// We keep the fixed black/60 div for overlay on top of video, lowering its visibility so the text is clear
content = content.replace(
  /<div className="fixed top-0 left-0 w-\[100vw\] h-\[100vh\] -z-40 bg-black\/60 backdrop-blur-\[2px\]"><\/div>/,
  '<div className="fixed top-0 left-0 w-full h-full -z-40 bg-black/70 backdrop-blur-[4px]"></div>'
);

fs.writeFileSync('src/pages/Landing.tsx', content, 'utf8');
