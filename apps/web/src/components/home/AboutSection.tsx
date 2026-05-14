export function AboutSection() {
  return (
    <section id="about" className="max-w-[1300px] mx-auto w-full px-[4rem] py-[6rem] border-b border-gb-border">
      <div className="grid md:grid-cols-2 gap-[6rem] items-center">
        {/* Left — Text Column */}
        <div>
          {/* Section tag */}
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-[0.75rem] tracking-[4px] text-gb-green uppercase">What is GitBattle</span>
            <div className="w-[60px] h-[1px] bg-gb-green"></div>
          </div>

          <h2 className="font-display text-[3.5rem] text-white leading-none tracking-[4px] mb-6">
            GIT COMMANDS ARE YOUR <span className="text-gb-green">WEAPONS</span>
          </h2>

          <p className="font-body text-[1.05rem] text-gb-muted leading-[1.7] mb-4">
            GitBattle is a real-time 1v1 battle game where every move is a real Git command. Type <code className="font-mono text-gb-green">git commit</code> to deploy troops. Type <code className="font-mono text-gb-green">git push</code> to launch an attack. Win the battle. Master Git without realizing you're learning.
          </p>
          <p className="font-body text-[1.05rem] text-gb-muted leading-[1.7] mb-10">
            No menus. No drag-and-drop. Just a text field, a timer, and your knowledge of Git. Competitive pressure + live spectators + instant visual consequences = commands that stick forever.
          </p>

          {/* Stats List */}
          <div className="flex flex-col gap-6">
            <div className="flex gap-6 items-center">
              <div className="font-display text-[1.8rem] text-gb-green leading-none w-[160px]">GitHub OAuth</div>
              <div className="font-mono text-[0.7rem] text-gb-muted uppercase tracking-[1px]">Log in with your GitHub account</div>
            </div>
            <div className="flex gap-6 items-center">
              <div className="font-display text-[1.8rem] text-gb-gold leading-none w-[160px]">Real-Time 1v1</div>
              <div className="font-mono text-[0.7rem] text-gb-muted uppercase tracking-[1px]">Against live human opponents</div>
            </div>
            <div className="flex gap-6 items-center">
              <div className="font-display text-[1.8rem] text-gb-red leading-none w-[160px]">Live Spectating</div>
              <div className="font-mono text-[0.7rem] text-gb-muted uppercase tracking-[1px]">Watch your peers battle it out</div>
            </div>
          </div>
        </div>

        {/* Right — Battlefield Preview Card */}
        <div className="relative perspective-[800px]">
          <div className="w-full bg-gb-bg2 border border-gb-border shadow-[0_40px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.07)] transform-gpu transition-transform duration-500 ease-out hover:rotate-x-5 hover:rotate-y-0 preserve-3d" style={{ transform: "rotateX(15deg) rotateY(-5deg)" }}>
            
            {/* Card Header */}
            <div className="flex justify-between items-center p-4 border-b border-gb-border">
              {/* Left Player */}
              <div className="flex flex-col gap-1 w-[120px]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border border-gb-green flex items-center justify-center font-display text-[0.7rem] text-gb-green bg-[rgba(0,255,136,0.1)]">OC</div>
                  <span className="font-body font-semibold text-[0.8rem] text-white">octocat</span>
                </div>
                <div className="w-full h-1 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                  <div className="h-full bg-gb-green w-[85%]"></div>
                </div>
              </div>

              {/* Timer */}
              <div className="font-mono text-[0.7rem] text-gb-muted">TURN 4 · ⏱ 22s</div>

              {/* Right Player */}
              <div className="flex flex-col gap-1 w-[120px] items-end">
                <div className="flex items-center gap-2 flex-row-reverse">
                  <div className="w-6 h-6 rounded-full border border-gb-red flex items-center justify-center font-display text-[0.7rem] text-gb-red bg-[rgba(255,68,85,0.1)]">TL</div>
                  <span className="font-body font-semibold text-[0.8rem] text-white">torvalds</span>
                </div>
                <div className="w-full h-1 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden flex justify-end">
                  <div className="h-full bg-gb-red w-[60%]"></div>
                </div>
              </div>
            </div>

            {/* Card Arena */}
            <div className="h-[120px] flex items-center justify-between px-10">
              <div className="flex gap-2 flex-wrap w-[60px]">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="w-[14px] h-[14px] rounded-full bg-gb-green shadow-[0_0_8px_rgba(0,255,136,0.4)] animate-bounce-gentle" style={{ animationDelay: `${i * 0.15}s` }}></div>
                ))}
              </div>
              <div className="text-[1.5rem] drop-shadow-[0_0_8px_rgba(255,204,0,0.5)]">⚔️</div>
              <div className="flex gap-2 flex-wrap w-[40px] justify-end">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-[14px] h-[14px] rounded-full bg-gb-red shadow-[0_0_8px_rgba(255,68,85,0.4)] animate-bounce-gentle" style={{ animationDelay: `${i * 0.15 + 0.5}s` }}></div>
                ))}
              </div>
            </div>

            {/* Card Command Input */}
            <div className="p-4 border-t border-gb-border bg-[rgba(0,0,0,0.3)]">
              <div className="font-mono text-[0.8rem]">
                <span className="text-gb-green">$ </span>
                <span className="text-white">git merge attack-flank</span>
                <span className="inline-block w-[8px] h-[14px] bg-gb-green align-middle ml-1 animate-blink"></span>
              </div>
            </div>

            {/* Card Footer */}
            <div className="flex justify-between items-center px-4 py-2 bg-gb-bg2">
              <div className="font-mono text-[0.7rem] text-gb-muted">👁 14 spectators</div>
              <div className="font-mono text-[0.7rem] text-gb-green">Staging: 2 troops ready</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
