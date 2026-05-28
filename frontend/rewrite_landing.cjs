const fs = require('fs');

let content = fs.readFileSync('src/pages/Landing.tsx', 'utf8');

// Add video ref and useEffect
if (!content.includes('useRef')) {
  content = content.replace("import { Link } from 'react-router-dom';", "import { Link } from 'react-router-dom';\nimport { useEffect, useRef } from 'react';");
}

let videoCode = `
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Make sure we pause the video to control manually
    video.pause();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      if (maxScroll <= 0) return;
      
      const scrollProgress = Math.max(0, Math.min(1, scrollTop / maxScroll));

      if (video.duration) {
        // Optional: you can clamp it slightly below duration so it doesn't end abruptly
        const targetTime = scrollProgress * video.duration;
        window.requestAnimationFrame(() => {
          video.currentTime = targetTime;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    video.addEventListener('loadedmetadata', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      video.removeEventListener('loadedmetadata', handleScroll);
    };
  }, []);
`;


if (!content.includes('videoRef = useRef')) {
  // Inject before return (
  content = content.replace("return (", videoCode + "\n  return (");
}

// Replace top level wrapper
content = content.replace(
  /<div className="w-full flex flex-col pt-16 lg:pt-0 overflow-x-hidden text-left bg-white">/,
  `<div className="w-full flex flex-col pt-16 lg:pt-0 overflow-x-hidden text-left text-white">\n      <video \n        ref={videoRef}\n        src="/Stadium.mp4" \n        className="fixed top-0 left-0 w-[100vw] h-[100vh] object-cover -z-50 opacity-40 mix-blend-screen bg-black"\n        preload="auto"\n        muted\n        playsInline\n        style={{ backgroundColor: 'black' }}\n      />\n      <div className="fixed top-0 left-0 w-[100vw] h-[100vh] -z-40 bg-black/60 backdrop-blur-[2px]"></div>`
);

// We need to keep a dark overlay so the white text is visible over the video. Let's use bg-black/60 and backdrop blur.

// Update Section 1
content = content.replace("bg-white px-8", "px-8"); // remove bg-white from hero
content = content.replace("text-google-black", "text-white"); // CAPTAIN COOL -> COOL is white.
content = content.replace("bg-[#0d0d0d]", "bg-transparent backdrop-blur-md bg-black/30 border-y border-white/10"); // Section 2
content = content.replace("bg-[#f0f4f8]", "bg-transparent backdrop-blur-md bg-white/5 border-y border-white/10"); // Section 3
content = content.replace("bg-[#1a73e8]", "bg-blue-600/40 backdrop-blur-md border-y border-blue-400/20"); // Section 4 CTA
content = content.replace("bg-white rounded-3xl", "bg-black/40 backdrop-blur-lg border border-white/10 rounded-3xl text-white"); // Card 1
content = content.replace("bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)]", "bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50"); // Card inside section 3

// Text colors adjustment
content = content.replace(/text-google-black/g, "text-white");
content = content.replace(/text-\[#1a73e8\]/g, "text-blue-400");
content = content.replace(/bg-\[#f8f9fa\]/g, "bg-white/10");
content = content.replace(/text-\[#202124\]/g, "text-white");
content = content.replace(/text-\[#5f6368\]/g, "text-gray-300");

// Update btn styles
content = content.replace("btn-dark", "bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 px-6 py-3 rounded-full font-bold");

fs.writeFileSync('src/pages/Landing.tmp.tsx', content, 'utf8');
