import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scene3D, cameraState } from "./Scene3D";
import { apiUrl } from "../../lib/api";
import { Howl } from "howler";

gsap.registerPlugin(ScrollTrigger);

export function CinematicPage({ user }: { user: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [ambientSound, setAmbientSound] = useState<Howl | null>(null);

  useEffect(() => {
    // Sound setup
    const sound = new Howl({
      src: ['https://actions.google.com/sounds/v1/weather/wind_and_rain.ogg'], // Placeholder ambient
      loop: true,
      volume: 0.3,
    });
    setAmbientSound(sound);
    
    return () => {
      sound.unload();
    };
  }, []);

  useEffect(() => {
    if (ambientSound) {
      if (audioEnabled) ambientSound.play();
      else ambientSound.pause();
    }
  }, [audioEnabled, ambientSound]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Set initial camera state (Act 1)
    gsap.set(cameraState.position, { x: 0, y: 100, z: 40 });
    gsap.set(cameraState.lookAt, { x: 0, y: 0, z: 0 });

    // Timeline for all camera moves
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth scrub
      }
    });

    // Act 1 -> Act 2: Dive down to ground
    tl.to(cameraState.position, { x: -20, y: 5, z: 20, ease: "power2.inOut" }, 0)
      .to(cameraState.lookAt, { x: 20, y: 5, z: -20, ease: "power2.inOut" }, 0);

    // Act 2 -> Act 3: Rise to mid-height, face center board
    tl.to(cameraState.position, { x: 0, y: 20, z: 30, ease: "power2.inOut" }, 1)
      .to(cameraState.lookAt, { x: 0, y: 10, z: 0, ease: "power2.inOut" }, 1);

    // Act 3 -> Act 4: Swing to side view
    tl.to(cameraState.position, { x: 40, y: 15, z: 0, ease: "power2.inOut" }, 2)
      .to(cameraState.lookAt, { x: 0, y: 5, z: 0, ease: "power2.inOut" }, 2);

    // Act 4 -> Act 5: Rotate 90 deg and approach Leaderboard monument
    tl.to(cameraState.position, { x: 0, y: 5, z: -60, ease: "power2.inOut" }, 3)
      .to(cameraState.lookAt, { x: 0, y: 5, z: -80, ease: "power2.inOut" }, 3);

    // Act 5 -> Act 6: Rise dramatically back to sky
    tl.to(cameraState.position, { x: 0, y: 120, z: 0, ease: "power2.inOut" }, 4)
      .to(cameraState.lookAt, { x: 0, y: 0, z: 0, ease: "power2.inOut" }, 4);

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#000005] font-body text-[#e8e8d0]">
      {/* Persistent UI */}
      <div className="fixed top-4 left-4 z-50 font-mono text-[0.65rem] tracking-[3px] text-[rgba(0,255,136,0.4)] pointer-events-none">
        SECTOR: 7-ALPHA | TURN: ACTIVE | STATUS: ONLINE
      </div>
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2 pointer-events-none">
        <div className="w-[6px] h-[6px] rounded-full bg-gb-green animate-pulse-fast"></div>
        <span className="font-mono text-[0.7rem] text-[rgba(0,255,136,0.5)] tracking-[2px]">👁 1,204 PLAYERS ONLINE</span>
      </div>
      <button 
        className="fixed bottom-4 right-4 z-50 font-mono text-[0.7rem] text-gb-muted tracking-[2px] hover:text-white"
        onClick={() => setAudioEnabled(!audioEnabled)}
      >
        {audioEnabled ? '🔊 AUDIO ON' : '🔇 AUDIO OFF'}
      </button>

      {/* 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas dpr={[1, 1.5]}>
          <Scene3D />
        </Canvas>
      </div>

      {/* Scrolling Container for the 6 Acts */}
      <div className="relative z-10 w-full text-shadow-solid">
        
        {/* ACT 1: OVERVIEW */}
        <section className="act-section h-screen w-full flex flex-col items-center justify-center relative">
          <div className="absolute top-[15%] border border-[#ff4455] px-4 py-1 text-[#ff4455] font-mono text-[0.8rem] tracking-[6px] animate-fade-in-up">
            [ CLASSIFIED OPERATION ]
          </div>
          <div className="text-center mt-8">
            <h1 className="font-display text-[clamp(6rem,18vw,16rem)] leading-[0.85] m-0 text-[#00ff88]" style={{ textShadow: "0 0 60px rgba(0,255,136,0.6)" }}>
              GIT
            </h1>
            <div className="w-full h-[1px] bg-[rgba(255,255,255,0.15)] my-2"></div>
            <h1 className="font-display text-[clamp(6rem,18vw,16rem)] leading-[0.85] m-0 text-white" style={{ textShadow: "0 0 40px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,1)" }}>
              BATTLE
            </h1>
          </div>
          <p className="font-mono text-[0.9rem] tracking-[5px] text-[rgba(255,255,255,0.6)] mt-8">
            LEARN GIT. WAGE WAR. CLAIM THE REPOSITORY.
          </p>
          <div className="flex gap-6 mt-12">
            <a href={user ? "/dashboard/host" : apiUrl("/auth/github")} className="bg-[rgba(255,68,85,0.15)] border border-[rgba(255,68,85,0.6)] text-[#ff4455] font-display text-[1.1rem] tracking-[4px] px-8 py-3 clip-corner-right hover:bg-[#ff4455] hover:text-black transition-all">
              HOST A BATTLE
            </a>
            <a href={user ? "/dashboard" : apiUrl("/auth/github")} className="bg-[rgba(0,255,136,0.1)] border border-[rgba(0,255,136,0.5)] text-[#00ff88] font-display text-[1.1rem] tracking-[4px] px-8 py-3 clip-corner-left hover:bg-[#00ff88] hover:text-black transition-all">
              JOIN AS PLAYER
            </a>
          </div>
          <div className="absolute bottom-[5%] flex flex-col items-center animate-bounce-gentle">
            <span className="font-mono text-[0.7rem] tracking-[4px] text-[rgba(255,255,255,0.3)]">▼ SCROLL TO DEPLOY ▼</span>
          </div>
        </section>

        {/* ACT 2: THE BRIEFING */}
        <section className="act-section h-screen w-full relative flex items-center">
          <div className="pl-[10%] max-w-[600px]">
            <div className="inline-block border-l-4 border-[#00ff88] bg-[rgba(0,255,136,0.1)] px-4 py-1 font-mono text-[0.85rem] text-[#00ff88] tracking-[3px] mb-6">
              MISSION BRIEFING
            </div>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none mb-6">
              GIT COMMANDS<br/><span className="text-[#00ff88]">ARE YOUR<br/>WEAPONS</span>
            </h2>
            <p className="font-body text-[1.1rem] text-[rgba(255,255,255,0.65)] leading-[1.8] mb-8 max-w-[500px]">
              GitBattle is a real-time 1v1 war game where every move is a real Git command. Type `git commit` to deploy your troops. Type `git push` to launch an attack. Your knowledge of Git is your only weapon. Learn it. Or lose.
            </p>
            <div className="flex gap-8">
              <div>
                <div className="font-display text-[3rem] text-[#00ff88] leading-none">1v1</div>
                <div className="font-mono text-[0.7rem] text-[rgba(255,255,255,0.4)] tracking-[2px]">REAL-TIME COMBAT</div>
              </div>
              <div>
                <div className="font-display text-[3rem] text-[#00ff88] leading-none">18</div>
                <div className="font-mono text-[0.7rem] text-[rgba(255,255,255,0.4)] tracking-[2px]">GIT COMMANDS</div>
              </div>
            </div>
          </div>
        </section>

        {/* ACT 3: THE ARSENAL */}
        <section className="act-section h-screen w-full relative flex items-center justify-center">
          <div className="max-w-[800px] w-full text-center">
            <div className="font-mono text-[0.85rem] text-[#00ff88] tracking-[3px] mb-4">THE COMMAND CODEX</div>
            <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-none mb-10">
              YOUR <span className="text-[#ffaa00]">ARSENAL</span>
            </h2>
            <div className="w-full bg-[rgba(0,0,0,0.6)] border-t-[3px] border-[#ffaa00] p-6 text-left font-mono backdrop-blur-sm">
              <div className="flex text-[#ffaa00] text-[0.8rem] tracking-[2px] pb-4 border-b border-[rgba(255,255,255,0.1)]">
                <div className="flex-1">COMMAND</div>
                <div className="flex-1">BATTLE ACTION</div>
                <div className="flex-1">EFFECT</div>
              </div>
              <div className="flex items-center py-4 border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(0,255,136,0.06)] transition-colors">
                <div className="flex-1"><span className="bg-[rgba(0,255,136,0.1)] border border-[#00ff88] text-[#00ff88] px-2 py-1">git commit</span></div>
                <div className="flex-1 font-display tracking-[3px] text-[1.2rem]">🛡️ DEPLOY</div>
                <div className="flex-1 font-body text-gb-muted text-[0.9rem]">Moves staging to battlefield</div>
              </div>
              <div className="flex items-center py-4 hover:bg-[rgba(0,255,136,0.06)] transition-colors">
                <div className="flex-1"><span className="bg-[rgba(0,255,136,0.1)] border border-[#00ff88] text-[#00ff88] px-2 py-1">git push</span></div>
                <div className="flex-1 font-display tracking-[3px] text-[1.2rem]">⚔️ ATTACK</div>
                <div className="flex-1 font-body text-gb-muted text-[0.9rem]">Launch full offensive</div>
              </div>
            </div>
          </div>
        </section>

        {/* ACT 4: THE BATTLEFIELD */}
        <section className="act-section h-screen w-full relative">
          <div className="absolute top-0 w-full bg-[rgba(0,0,0,0.5)] border-b border-[#00ff88] flex justify-between items-center px-8 py-2 font-mono text-[0.9rem]">
            <div>🟢 octocat <span className="ml-4 text-gb-green">HP ██████████ 100</span></div>
            <div className="text-[#ffaa00]">TURN 6 · 18s · SENIOR MODE</div>
            <div><span className="mr-4 text-gb-red">HP ████████░░ 74</span> torvalds 🔴</div>
          </div>
          <div className="absolute top-16 w-full text-center font-mono text-[0.8rem] text-[rgba(255,255,255,0.4)] tracking-[3px]">
            👁 14 PLAYERS WATCHING THIS MATCH
          </div>
        </section>

        {/* ACT 5: THE LEADERBOARD */}
        <section className="act-section h-screen w-full relative flex items-center justify-center">
          <h2 className="font-display text-[clamp(4rem,10vw,8rem)] text-[#ffaa00]">LEADERBOARD</h2>
        </section>

        {/* ACT 6: CALL TO ARMS */}
        <section className="act-section h-screen w-full relative flex flex-col items-center justify-center bg-[rgba(0,0,0,0.55)]">
          <h2 className="font-display text-[clamp(4rem,12vw,11rem)] leading-none text-center mb-16">
            ENTER THE<br/><span className="text-[#00ff88]" style={{ textShadow: "0 0 60px rgba(0,255,136,0.6)" }}>ARENA</span>
          </h2>
          <div className="flex w-full max-w-[700px] h-[200px]">
             {/* Left - HOST */}
            <a href={user ? "/dashboard/host" : apiUrl("/auth/github")} className="flex-1 flex flex-col items-center justify-center border-l-4 border-[#ff4455] bg-gradient-to-r from-[rgba(255,68,85,0.12)] to-transparent hover:flex-[1.2] transition-all">
              <div className="text-3xl mb-2">🏛️</div>
              <div className="font-display text-[2rem] text-[#ff4455] tracking-[5px]">HOST A BATTLE</div>
            </a>
            <div className="w-[1px] h-full bg-[rgba(255,255,255,0.15)] relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#000005] border border-[#ffaa00] text-[#ffaa00] rounded-full w-10 h-10 flex items-center justify-center font-display text-xl">VS</div>
            </div>
             {/* Right - JOIN */}
            <a href={user ? "/dashboard" : apiUrl("/auth/github")} className="flex-1 flex flex-col items-center justify-center border-l-4 border-[#00ff88] bg-gradient-to-r from-[rgba(0,255,136,0.12)] to-transparent hover:flex-[1.2] transition-all">
              <div className="text-3xl mb-2">⚔️</div>
              <div className="font-display text-[2rem] text-[#00ff88] tracking-[5px]">JOIN AS PLAYER</div>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
