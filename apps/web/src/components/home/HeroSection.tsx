import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { apiUrl } from "../../lib/api";
import { Scene3D } from "./Scene3D";

const TERMINAL_COMMANDS = [
  { cmd: "$ git push", res: "→ Launched attack! 3 damage dealt", eff: "💥 Enemy base HP: 74", effColor: "text-gb-gold" },
  { cmd: "$ git merge flank", res: "→ Flank executed successfully", eff: "⚔️ Power doubled for next attack", effColor: "text-gb-gold" },
  { cmd: "$ git cherry-pick", res: "→ Target acquired", eff: "🎯 Defection: 1 enemy converted", effColor: "text-gb-green" },
  { cmd: "$ git reset --hard", res: "→ Tactical nuke deployed", eff: "💣 All armies wiped", effColor: "text-gb-red" },
  { cmd: "$ git stash", res: "→ Troops retreated safely", eff: "🛡️ Staging area +5", effColor: "text-gb-blue" },
];

export function HeroSection({ user }: { user: any }) {
  // Terminal typing effect state
  const [termLine, setTermLine] = useState(0);
  const [typedCmd, setTypedCmd] = useState("");
  const [showResult, setShowResult] = useState(false);

  // Typewriter effect
  useEffect(() => {
    let isMounted = true;
    
    const runTyping = async () => {
      const current = TERMINAL_COMMANDS[termLine];
      if (!current) return;
      
      setTypedCmd("");
      setShowResult(false);
      
      for (let i = 0; i <= current.cmd.length; i++) {
        if (!isMounted) return;
        setTypedCmd(current.cmd.slice(0, i));
        await new Promise(r => setTimeout(r, 80));
      }
      
      if (!isMounted) return;
      setShowResult(true);
      await new Promise(r => setTimeout(r, 2500));
      if (!isMounted) return;
      setTermLine((prev) => (prev + 1) % TERMINAL_COMMANDS.length);
    };

    runTyping();

    return () => {
      isMounted = false;
    };
  }, [termLine]);

  // Stat Counters
  const [stats, setStats] = useState([0, 0, 0, 0]);
  useEffect(() => {
    const targets = [2847, 1204, 18, 4];
    const duration = 2000;
    const startTime = performance.now();
    let animId: number;

    const animateStats = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      setStats(targets.map(t => Math.floor(t * easeProgress)));

      if (progress < 1) {
        animId = requestAnimationFrame(animateStats);
      }
    };
    animId = requestAnimationFrame(animateStats);
    
    return () => cancelAnimationFrame(animId);
  }, []);

  const floatingPillsLeft = ['git push', 'git commit -m "attack"', 'git add .', 'git merge flank'];
  const floatingPillsRight = ['git reset --hard', 'git stash', 'git rebase', 'git cherry-pick'];
  
  const currentTerminalCmd = TERMINAL_COMMANDS[termLine];

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center pt-[4.5rem]">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
          <Scene3D />
        </Canvas>
      </div>

      {/* Floating Ambient Pills */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {floatingPillsLeft.map((cmd, i) => (
          <div key={i} className="absolute left-[15%] text-[0.7rem] font-mono border border-gb-border px-2 py-1 rounded-full text-gb-green animate-float" style={{ animationDelay: `${i * 2}s`, bottom: '-10%' }}>
            {cmd}
          </div>
        ))}
        {floatingPillsRight.map((cmd, i) => (
          <div key={i} className="absolute right-[15%] text-[0.7rem] font-mono border border-gb-border px-2 py-1 rounded-full text-gb-red animate-float" style={{ animationDelay: `${i * 2 + 1}s`, bottom: '-10%' }}>
            {cmd}
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-[1300px] w-full px-[4rem]">
        {/* Status Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(0,255,136,0.05)] border border-gb-border mb-[1.5rem]">
          <div className="w-[6px] h-[6px] rounded-full bg-gb-green animate-pulse-fast"></div>
          <span className="font-mono text-[0.75rem] tracking-[3px] text-gb-green uppercase">Now in open beta</span>
        </div>

        {/* Main Title */}
        <div className="text-center mb-[1.5rem] leading-[0.9] tracking-[8px]">
          <h1 className="font-display text-[clamp(5rem,15vw,13rem)] text-gb-green glitch relative inline-block m-0" data-text="GIT">GIT</h1>
          <h2 className="font-display text-[clamp(5rem,15vw,13rem)] text-white m-0">BATTLE</h2>
        </div>

        {/* Tagline */}
        <p className="font-mono text-[1rem] tracking-[4px] text-gb-muted uppercase mb-[1.5rem] text-center">
          Learn Git. Wage <span className="text-gb-green">War</span>. Dominate the repo.
        </p>

        {/* Animated Terminal */}
        <div className="w-full max-w-[500px] bg-[rgba(0,0,0,0.6)] border border-gb-border border-t-[2px] border-t-gb-green rounded-b-md shadow-2xl mb-[1.5rem] overflow-hidden text-left p-4 pb-6">
          <div className="flex gap-[4px] mb-4">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
          </div>
          <div className="font-mono text-[0.9rem] leading-relaxed">
            <div className="text-white">
              {typedCmd}
              <span className="inline-block w-2 h-[1em] bg-gb-green align-middle ml-1 animate-blink"></span>
            </div>
            {showResult && currentTerminalCmd && (
              <div className="mt-1">
                <div className="text-gb-text">{currentTerminalCmd.res}</div>
                <div className={`text-[0.8rem] mt-1 ${currentTerminalCmd.effColor}`}>{currentTerminalCmd.eff}</div>
              </div>
            )}
            <div className="h-10"></div> {/* spacer */}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-[1.5rem] mb-[2rem] z-20">
          <a
            href={user ? "/dashboard/host" : apiUrl("/auth/github")}
            className="flex items-center gap-2 font-display text-[1.2rem] tracking-[4px] text-white px-10 py-4 bg-gradient-to-br from-gb-red to-[#cc0022] clip-corner-right hover:-translate-y-[2px] glow-red transition-all"
          >
            <span aria-hidden="true">🏛️</span> HOST A BATTLE
          </a>
          <a
            href={user ? "/dashboard" : apiUrl("/auth/github")}
            className="flex items-center gap-2 font-display text-[1.2rem] tracking-[4px] text-gb-bg px-10 py-4 bg-gradient-to-br from-gb-green to-[#00cc66] clip-corner-left hover:-translate-y-[2px] glow-green transition-all"
          >
            <span aria-hidden="true">⚔️</span> JOIN AS PLAYER
          </a>
        </div>

        {/* Stats */}
        <div className="w-full flex justify-center gap-12 pt-8 border-t border-gb-border">
          {[
            { num: stats[0]?.toLocaleString(), label: "Matches Played" },
            { num: stats[1]?.toLocaleString(), label: "Players Enlisted" },
            { num: stats[2], label: "Git Commands" },
            { num: stats[3], label: "Battle Modes" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-[2.2rem] text-gb-green leading-none mb-1">{stat.num}</div>
              <div className="font-mono text-[0.65rem] tracking-[2px] text-gb-muted uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-[2rem] left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce-gentle">
        <span className="font-mono text-[0.7rem] tracking-[3px] text-gb-muted uppercase mb-2">Scroll</span>
        <div className="w-[1px] h-[40px] bg-gradient-to-b from-gb-muted to-transparent"></div>
      </div>
    </section>
  );
}
