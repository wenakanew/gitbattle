export function CommandCodexSection() {
  const commands = [
    { cmd: "git add <name>", action: "🪖 Recruit", effect: "Adds 1 soldier to staging area", tier: "RECRUIT+" },
    { cmd: "git add .", action: "🪖🪖🪖 Mass Deploy", effect: "Adds 3 soldiers to staging at once", tier: "RECRUIT+" },
    { cmd: 'git commit -m ""', action: "🚀 Launch", effect: "Moves all staged soldiers onto battlefield", tier: "RECRUIT+" },
    { cmd: "git push", action: "⚔️ Attack", effect: "Deployed troops charge enemy base", tier: "RECRUIT+" },
    { cmd: "git pull", action: "💊 Reinforce", effect: "Heals your base HP", tier: "OPERATIVE+" },
    { cmd: "git merge <branch>", action: "💥 Overload", effect: "Doubles the power of next attack", tier: "OPERATIVE+" },
    { cmd: "git branch <name>", action: "🗺️ Flank", effect: "Creates secondary attack lane", tier: "OPERATIVE+" },
    { cmd: "git stash", action: "🛡️ Retreat", effect: "Safely pull troops back to staging", tier: "OPERATIVE+" },
    { cmd: "git rebase", action: "⚡ Power Up", effect: "Next attack deals 1.5× damage", tier: "COMMANDER+" },
    { cmd: "git cherry-pick", action: "🎯 Convert", effect: "Convert 1 enemy soldier to your side", tier: "COMMANDER+" },
    { cmd: "git log", action: "🔭 Intel", effect: "Reveal opponent's last 3 commands", tier: "COMMANDER+" },
    { cmd: "git reset --hard", action: "💣 NUKE", effect: "Wipe entire army — desperation play", tier: "COMMANDER+" }
  ];

  return (
    <section id="commands" className="w-full py-[8rem] px-[4rem] border-b border-[rgba(212, 175, 55, 0.1)] relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 war-smoke opacity-20 pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-3 h-3 bg-[#cc2633]"></div>
            <span className="font-mono text-[0.8rem] tracking-[5px] text-[#cc2633] uppercase">Arsenal Overview</span>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-[#cc2633] to-transparent"></div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-black text-[clamp(2.5rem, 6vw, 4rem)] leading-[1.1] text-white tracking-[-1px]">
              COMMAND <span style={{ color: "#d4af37" }}>CODEX</span>
            </h2>
            <div className="font-mono text-xs tracking-[3px] text-[#d4af37]">
              18 TOTAL COMMANDS · 4 BATTLE TIERS
            </div>
          </div>
        </div>

        {/* Commands Table */}
        <div className="overflow-x-auto border border-[rgba(212, 175, 55, 0.2)]">
          {/* Header Row */}
          <div className="grid grid-cols-[1fr_1fr_2fr_1fr] gap-4 p-6 border-b border-[rgba(212, 175, 55, 0.2)] bg-[rgba(26, 26, 26, 0.8)]">
            <div className="font-mono text-xs tracking-[3px] text-[#d4af37] uppercase">COMMAND</div>
            <div className="font-mono text-xs tracking-[3px] text-[#d4af37] uppercase">BATTLE ACTION</div>
            <div className="font-mono text-xs tracking-[3px] text-[#d4af37] uppercase hidden md:block">EFFECT</div>
            <div className="font-mono text-xs tracking-[3px] text-[#d4af37] uppercase">TIER</div>
          </div>

          {/* Rows */}
          {commands.map((c, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_1fr_2fr_1fr] gap-4 p-6 border-b border-[rgba(212, 175, 55, 0.1)] hover:bg-[rgba(212, 175, 55, 0.05)] transition-colors duration-200 items-center group"
            >
              {/* Command */}
              <div className="font-mono text-sm text-[#2db84d] bg-[rgba(45, 184, 77, 0.1)] px-3 py-2 rounded border border-[rgba(45, 184, 77, 0.2)] group-hover:border-[#2db84d] transition-colors">
                {c.cmd}
              </div>

              {/* Action */}
              <div className="font-body font-semibold text-white flex items-center gap-2">
                <span className="text-lg">{c.action.split(' ')[0]}</span>
                <span>{c.action.substring(c.action.indexOf(' ') + 1)}</span>
              </div>

              {/* Effect */}
              <div className="font-body text-sm text-[#a9a9a0] hidden md:block group-hover:text-white transition-colors">
                {c.effect}
              </div>

              {/* Tier */}
              <div className="font-mono text-xs tracking-[2px] font-bold">
                <span
                  className="px-2 py-1 rounded border"
                  style={{
                    color: c.tier.includes("RECRUIT") ? "#2db84d" : c.tier.includes("OPERATIVE") ? "#d4af37" : "#cc2633",
                    borderColor: c.tier.includes("RECRUIT") ? "rgba(45, 184, 77, 0.5)" : c.tier.includes("OPERATIVE") ? "rgba(212, 175, 55, 0.5)" : "rgba(204, 38, 51, 0.5)",
                    background: c.tier.includes("RECRUIT") ? "rgba(45, 184, 77, 0.08)" : c.tier.includes("OPERATIVE") ? "rgba(212, 175, 55, 0.08)" : "rgba(204, 38, 51, 0.08)",
                  }}
                >
                  {c.tier}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-8 text-center font-mono text-sm text-[#a9a9a0]">
          <span style={{ color: "#cc2633" }}>⚠ 6 ADVANCED COMMANDS</span> unlocked in COMMANDER and LEGEND tiers
        </div>
      </div>
    </section>
  );
}
