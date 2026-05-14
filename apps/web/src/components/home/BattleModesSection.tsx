export function BattleModesSection() {
  const modes = [
    {
      id: "recruit",
      icon: "🎖",
      rank: "RECRUIT",
      timer: "45s DEPLOYMENT WINDOW",
      threat: "█░░░░░░░░",
      desc: "Master the 4 essential tactics. Extended thinking time. Build your arsenal before facing elite squadrons.",
      commands: ["git add", "git commit", "git push", "git pull"],
      color: "#2db84d",
      borderColor: "rgba(45, 184, 77, 0.4)",
    },
    {
      id: "operative",
      icon: "⚔️",
      rank: "OPERATIVE",
      timer: "30s DEPLOYMENT WINDOW",
      threat: "█████░░░░",
      desc: "8 battle-tested commands. Branching and merging strategies. Outmaneuver your enemy in the code repository.",
      commands: ["+ branch", "+ merge", "+ checkout", "+ stash"],
      color: "#d4af37",
      borderColor: "rgba(212, 175, 55, 0.4)",
    },
    {
      id: "commander",
      icon: "🏆",
      rank: "COMMANDER",
      timer: "20s DEPLOYMENT WINDOW",
      threat: "████████░",
      desc: "All 18 advanced commands unlocked. Rebase, cherry-pick, hard reset. Only the truly elite survive this.",
      commands: ["+ rebase", "+ cherry-pick", "+ reset", "+ tag"],
      color: "#cc2633",
      borderColor: "rgba(204, 38, 51, 0.4)",
    },
    {
      id: "legend",
      icon: "⚡",
      rank: "LEGEND",
      timer: "10s DEPLOYMENT WINDOW",
      threat: "██████████",
      desc: "Every command. 10 seconds to execute. Pure reflex and muscle memory. Only legends return alive.",
      commands: ["all commands", "NO MERCY MODE"],
      color: "#ff6b00",
      borderColor: "rgba(255, 107, 0, 0.4)",
    }
  ];

  return (
    <section id="modes" className="w-full px-[4rem] py-[8rem] border-b border-[rgba(212, 175, 55, 0.1)] relative overflow-hidden">
      {/* War smoke effect */}
      <div className="absolute inset-0 war-smoke opacity-20 pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section header - Tactical briefing */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-3 h-3 bg-[#cc2633]"></div>
            <span className="font-mono text-[0.8rem] tracking-[5px] text-[#cc2633] uppercase">TACTICAL SELECTION</span>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-[#cc2633] to-transparent"></div>
          </div>

          <h2 className="font-black text-[clamp(2.5rem, 6vw, 4rem)] leading-[1.1] text-white mb-6 tracking-[-1px]">
            CHOOSE YOUR<br />
            <span style={{ color: "#d4af37", textShadow: "0 0 40px rgba(212, 175, 55, 0.4)" }}>
              ENGAGEMENT LEVEL
            </span>
          </h2>

          <p className="font-body text-[1.05rem] text-[#a9a9a0] leading-[1.8] max-w-3xl">
            Each battle class grants you different Git command arsenals and adjusts your deployment window. Select the mode that matches your tactical readiness. Progress through the ranks as your skills sharpen.
          </p>
        </div>

        {/* Battle modes grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-[2rem] mb-8">
          {modes.map((m) => (
            <div
              key={m.id}
              className="group relative overflow-hidden transition-all duration-400 hover:scale-[1.05] cursor-pointer"
              style={{
                border: `2px solid ${m.borderColor}`,
                background: `linear-gradient(135deg, rgba(26, 26, 26, 0.8), rgba(42, 42, 42, 0.6))`,
                boxShadow: `0 0 40px ${m.borderColor}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 60px ${m.color}, inset 0 0 30px rgba(0, 0, 0, 0.5)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 0 40px ${m.borderColor}`;
              }}
            >
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 w-full h-[4px] transition-all duration-300 group-hover:h-[8px]"
                style={{ background: `linear-gradient(90deg, ${m.color}, transparent)` }}
              ></div>

              {/* Background gradient on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                style={{ background: m.color }}
              ></div>

              <div className="p-6 flex flex-col h-full relative z-10">
                {/* Rank badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{m.icon}</div>
                  <div
                    className="font-mono text-xs tracking-[4px] px-2 py-1 border border-current"
                    style={{ color: m.color, borderColor: m.color }}
                  >
                    TIER
                  </div>
                </div>

                {/* Rank name */}
                <h3 className="font-black text-2xl tracking-[2px] mb-3" style={{ color: m.color }}>
                  {m.rank}
                </h3>

                {/* Timer */}
                <div className="font-mono text-xs tracking-[2px] mb-4 text-[#d4af37]">
                  ⏱ {m.timer}
                </div>

                {/* Threat level */}
                <div className="font-mono text-xs mb-4 text-[#a9a9a0]">
                  <div className="text-[#cc2633] mb-1">{m.threat}</div>
                  <span className="text-[#888]">THREAT LEVEL</span>
                </div>

                {/* Description */}
                <p className="font-body text-sm text-[#a9a9a0] leading-[1.6] mb-6 flex-1">
                  {m.desc}
                </p>

                {/* Commands available */}
                <div className="flex flex-wrap gap-2">
                  {m.commands.map((cmd, i) => (
                    <span
                      key={i}
                      className="font-mono text-xs px-2 py-1 transition-all duration-300"
                      style={{
                        background: `rgba(212, 175, 55, ${cmd.includes("NO MERCY") ? 0.2 : 0.08})`,
                        color: cmd.includes("NO MERCY") ? "#cc2633" : "#d4af37",
                        border: `1px solid ${cmd.includes("NO MERCY") ? "rgba(204, 38, 51, 0.5)" : "rgba(212, 175, 55, 0.3)"}`,
                      }}
                    >
                      {cmd}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Deployment recommendation */}
        <div className="bg-[rgba(204, 38, 51, 0.1)] border-2 border-[#cc2633] p-6 mt-8">
          <p className="font-mono text-sm text-[#cc2633] tracking-[1px]">
            <span style={{ textShadow: "0 0 10px rgba(204, 38, 51, 0.5)" }}>⚠ TACTICAL ADVISORY:</span> {" "}
            New soldiers recommended to start at RECRUIT tier. Progress rapidly if you seek greater challenges. Legends who complete LEGEND tier 5 times are inducted into the Hall of Legends.
          </p>
        </div>
      </div>
    </section>
  );
}
