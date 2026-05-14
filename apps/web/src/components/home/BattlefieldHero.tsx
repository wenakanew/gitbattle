import { useEffect, useState, useRef } from "react";
import { apiUrl } from "../../lib/api";

export function BattlefieldHero({ user }: { user: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{
        background: `linear-gradient(135deg, rgba(10,10,10,0.9) 0%, rgba(26,26,26,0.85) 50%, rgba(15,15,15,0.9) 100%),
                     url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23444;stop-opacity:0.1' /%3E%3Cstop offset='100%25' style='stop-color:%23222;stop-opacity:0.05' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grad)'/%3E%3C/svg%3E")`,
      }}
    >
      {/* Atmospheric layers */}
      <div className="absolute inset-0 z-0 war-smoke opacity-50"></div>

      {/* Spotlight effect - Parallax with scroll */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 600px 400px at ${50 + mousePosition.x}% ${50 + mousePosition.y}%, 
                       rgba(212, 175, 55, 0.08) 0%, transparent 70%)`,
          transition: "background 0.1s ease-out",
        }}
      ></div>

      {/* Grid lines - Tactical overlay */}
      <div
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(212, 175, 55, 0.3) 25%, rgba(212, 175, 55, 0.3) 26%, transparent 27%, transparent 74%, rgba(212, 175, 55, 0.3) 75%, rgba(212, 175, 55, 0.3) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(212, 175, 55, 0.3) 25%, rgba(212, 175, 55, 0.3) 26%, transparent 27%, transparent 74%, rgba(212, 175, 55, 0.3) 75%, rgba(212, 175, 55, 0.3) 76%, transparent 77%, transparent)
          `,
          backgroundSize: "50px 50px",
        }}
      ></div>

      {/* Ambient dust particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-10 blur"
          style={{
            width: Math.random() * 200 + 50 + "px",
            height: Math.random() * 200 + 50 + "px",
            background: `radial-gradient(circle, rgba(139, 115, 85, 0.8), transparent)`,
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            animation: `float ${20 + Math.random() * 40}s ease-in-out infinite`,
            animationDelay: Math.random() * 10 + "s",
          }}
        ></div>
      ))}

      {/* Soldiers/Characters silhouettes - positioned in hero */}
      <div className="absolute bottom-0 left-0 right-0 h-[600px] z-2 pointer-events-none overflow-hidden">
        {/* Left soldier - moving in based on scroll */}
        <div
          className="absolute left-[5%] bottom-0 opacity-70 transition-all duration-300"
          style={{
            transform: `translateX(${-100 + scrollProgress * 200}px) translateY(${scrollProgress * 50}px) scaleX(-1)`,
            filter: "drop-shadow(0 0 30px rgba(204, 38, 51, 0.3))",
          }}
        >
          <svg
            viewBox="0 0 100 200"
            className="w-[180px] h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Soldier silhouette */}
            <g fill="#3a3a3a">
              <circle cx="50" cy="30" r="15" /> {/* Head */}
              <rect x="40" y="50" width="20" height="50" /> {/* Body */}
              <rect x="35" y="100" width="12" height="50" /> {/* Left leg */}
              <rect x="53" y="100" width="12" height="50" /> {/* Right leg */}
              <rect x="20" y="60" width="15" height="40" /> {/* Left arm */}
              <rect x="65" y="65" width="15" height="35" /> {/* Right arm with rifle */}
              <rect x="78" y="50" width="8" height="30" /> {/* Rifle */}
            </g>
            {/* Tactical elements */}
            <rect x="65" y="25" width="25" height="8" fill="#d4af37" opacity="0.6" /> {/* Optics */}
          </svg>
        </div>

        {/* Center soldier - hero soldier */}
        <div
          className="absolute left-1/2 bottom-0 transform -translate-x-1/2 opacity-100 transition-all duration-500"
          style={{
            filter: "drop-shadow(0 10px 60px rgba(204, 38, 51, 0.5)) drop-shadow(0 0 40px rgba(212, 175, 55, 0.2))",
            transform: `translateX(-50%) scaleY(${1 - scrollProgress * 0.1})`,
          }}
        >
          <svg
            viewBox="0 0 100 200"
            className="w-[280px] h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Hero soldier - more detailed */}
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g fill="#2a2a2a" filter="url(#glow)">
              <circle cx="50" cy="30" r="16" /> {/* Head */}
              <rect x="40" y="50" width="20" height="55" /> {/* Body */}
              <rect x="35" y="105" width="12" height="50" /> {/* Left leg */}
              <rect x="53" y="105" width="12" height="50" /> {/* Right leg */}
              <rect x="15" y="60" width="18" height="45" /> {/* Left arm */}
              <rect x="67" y="65" width="18" height="40" /> {/* Right arm */}
              <rect x="80" y="55" width="10" height="35" /> {/* Rifle barrel */}
            </g>
            {/* Armor plates */}
            <rect x="40" y="50" width="20" height="25" fill="#5a5a5a" opacity="0.8" />
            {/* Weapon details */}
            <rect x="78" y="50" width="12" height="50" fill="#4a4a4a" />
            <circle cx="90" cy="55" r="4" fill="#d4af37" /> {/* Scope */}
            {/* Status indicator */}
            <rect x="30" y="35" width="40" height="3" fill="#cc2633" opacity="0.7" />
            <rect x="30" y="35" width={`${(1 - scrollProgress) * 40}`} height="3" fill="#2db84d" opacity="0.9" />
          </svg>
        </div>

        {/* Right soldier - moving in based on scroll */}
        <div
          className="absolute right-[5%] bottom-0 opacity-70 transition-all duration-300"
          style={{
            transform: `translateX(${100 - scrollProgress * 200}px) translateY(${scrollProgress * 50}px)`,
            filter: "drop-shadow(0 0 30px rgba(204, 38, 51, 0.3))",
          }}
        >
          <svg
            viewBox="0 0 100 200"
            className="w-[180px] h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Soldier silhouette */}
            <g fill="#3a3a3a">
              <circle cx="50" cy="30" r="15" /> {/* Head */}
              <rect x="40" y="50" width="20" height="50" /> {/* Body */}
              <rect x="35" y="100" width="12" height="50" /> {/* Left leg */}
              <rect x="53" y="100" width="12" height="50" /> {/* Right leg */}
              <rect x="65" y="60" width="15" height="40" /> {/* Right arm */}
              <rect x="20" y="65" width="15" height="35" /> {/* Left arm with rifle */}
              <rect x="14" y="50" width="8" height="30" /> {/* Rifle */}
            </g>
            {/* Tactical elements */}
            <rect x="10" y="25" width="25" height="8" fill="#d4af37" opacity="0.6" /> {/* Optics */}
          </svg>
        </div>
      </div>

      {/* Main content - Text overlay */}
      <div className="relative z-10 text-center px-8 max-w-4xl">
        {/* Classified stamp */}
        <div
          className="inline-block mb-12 px-6 py-2 border-2 border-[#cc2633] text-[#cc2633] font-mono text-sm tracking-[6px] rotate-[-15deg]"
          style={{
            textShadow: "0 0 20px rgba(204, 38, 51, 0.5)",
            animation: "pulse 2s infinite",
          }}
        >
          ⚠ CLASSIFIED OPERATION
        </div>

        {/* Main heading with blur effect on scroll */}
        <div className="relative mb-8">
          <h1
            className="font-black text-[clamp(5rem, 15vw, 14rem)] leading-[0.9] m-0 text-white"
            style={{
              textShadow: `0 0 80px rgba(212, 175, 55, ${0.3 + scrollProgress * 0.4}),
                           0 20px 60px rgba(0, 0, 0, 0.8),
                           0 0 40px rgba(204, 38, 51, ${scrollProgress * 0.3})`,
              letterSpacing: `-${scrollProgress * 2}px`,
              transform: `scale(${1 - scrollProgress * 0.05}) translateY(${scrollProgress * -20}px)`,
              opacity: 1 - scrollProgress * 0.2,
            }}
          >
            GIT BATTLE
          </h1>

          {/* Tactical divider */}
          <div className="flex items-center justify-center gap-4 my-6">
            <div className="w-[100px] h-[2px] bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <span className="font-mono text-xs tracking-[4px] text-[#d4af37]">WARZONE LOADED</span>
            <div className="w-[100px] h-[2px] bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>
        </div>

        {/* Tagline */}
        <p className="font-mono text-lg tracking-[3px] text-[#d4af37] mb-12 opacity-90">
          DEPLOY YOUR GIT COMMANDS. WAGE DIGITAL WARFARE. CLAIM VICTORY.
        </p>

        {/* CTA Buttons - Battle ready */}
        <div className="flex flex-col md:flex-row gap-6 justify-center mb-16">
          <a
            href={user ? "/dashboard/host" : apiUrl("/auth/github")}
            className="group relative px-12 py-4 text-lg font-bold tracking-[3px] uppercase overflow-hidden transition-all duration-300 border-2 border-[#cc2633]"
            style={{
              background: "linear-gradient(135deg, rgba(204, 38, 51, 0.1), transparent)",
              color: "#cc2633",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(204, 38, 51, 0.4), rgba(204, 38, 51, 0.1))";
              e.currentTarget.style.boxShadow =
                "0 0 40px rgba(204, 38, 51, 0.6), inset 0 0 20px rgba(204, 38, 51, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(204, 38, 51, 0.1), transparent)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span className="relative z-10 flex items-center gap-3">
              🎖 HOST A BATTLE
            </span>
          </a>

          <a
            href={user ? "/dashboard" : apiUrl("/auth/github")}
            className="group relative px-12 py-4 text-lg font-bold tracking-[3px] uppercase overflow-hidden transition-all duration-300 border-2 border-[#2db84d]"
            style={{
              background: "linear-gradient(135deg, rgba(45, 184, 77, 0.1), transparent)",
              color: "#2db84d",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(45, 184, 77, 0.4), rgba(45, 184, 77, 0.1))";
              e.currentTarget.style.boxShadow =
                "0 0 40px rgba(45, 184, 77, 0.6), inset 0 0 20px rgba(45, 184, 77, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(45, 184, 77, 0.1), transparent)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span className="relative z-10 flex items-center gap-3">
              ▶ JOIN AS SOLDIER
            </span>
          </a>
        </div>

        {/* Live feed */}
        <div className="flex items-center justify-center gap-3 font-mono text-sm text-[#a9a9a0]">
          <div className="w-2 h-2 rounded-full bg-[#2db84d] animate-pulse"></div>
          <span>12,847 SOLDIERS DEPLOYED • 2,349 BATTLES ONGOING</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 font-mono text-xs tracking-[3px] text-[#d4af37] text-center opacity-70 transition-opacity duration-300"
        style={{ opacity: Math.max(0, 1 - scrollProgress) }}
      >
        <div className="mb-2">▼ SCROLL TO DEPLOY ▼</div>
        <div className="w-[1px] h-[30px] mx-auto animate-bounce-gentle" style={{ background: "#d4af37" }}></div>
      </div>
    </section>
  );
}
