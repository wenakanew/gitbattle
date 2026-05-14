import { useEffect, useState, useRef } from "react";

export function LeaderboardSection() {
  const players = [
    { name: "linux_torvalds", fav: "git rebase", wins: 47, elo: 2841, rank: "GENERAL" },
    { name: "xcoder99", fav: "git push", wins: 41, elo: 2704, rank: "COLONEL" },
    { name: "mergeking", fav: "git merge", wins: 38, elo: 2598, rank: "MAJOR" },
    { name: "githamster", fav: "git stash", wins: 33, elo: 2401, rank: "CAPTAIN" },
    { name: "dev_reaper", fav: "git cherry-pick", wins: 29, elo: 2287, rank: "LIEUTENANT" }
  ];

  const getRankColor = (rank: number) => {
    if (rank === 1) return { color: "#d4af37", border: "rgba(212, 175, 55, 0.6)" };
    if (rank === 2) return { color: "#aaa", border: "rgba(170, 170, 170, 0.6)" };
    if (rank === 3) return { color: "#cd7f32", border: "rgba(205, 127, 50, 0.6)" };
    return { color: "#6b6b6b", border: "rgba(107, 107, 107, 0.3)" };
  };

  const liveMatches = [
    { p1: { name: "sudo_hacker", color: "#2db84d" }, p2: { name: "syntax_error", color: "#cc2633" }, meta: "Turn 7 · COMMANDER" },
    { p1: { name: "react_ninja", color: "#2db84d" }, p2: { name: "vue_master", color: "#cc2633" }, meta: "Turn 2 · OPERATIVE" },
    { p1: { name: "git_push_force", color: "#2db84d" }, p2: { name: "node_modules", color: "#cc2633" }, meta: "Turn 14 · LEGEND" },
  ];

  const commandsStats = [
    { cmd: "git push", pct: 34, color: "#2db84d" },
    { cmd: "git commit", pct: 28, color: "#2db84d" },
    { cmd: "git merge", pct: 18, color: "#d4af37" },
    { cmd: "git reset --hard", pct: 8, color: "#cc2633" },
  ];

  // Animate bars on load/scroll
  const [showBars, setShowBars] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setShowBars(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="leaderboard" className="w-full px-[4rem] py-[8rem] border-b border-[rgba(212, 175, 55, 0.1)] relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 war-smoke opacity-15 pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-3 h-3 bg-[#d4af37]"></div>
            <span className="font-mono text-[0.8rem] tracking-[5px] text-[#d4af37] uppercase">Hall of Legends</span>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-[#d4af37] to-transparent"></div>
          </div>

          <h2 className="font-black text-[clamp(2.5rem, 6vw, 4rem)] leading-[1.1] text-white tracking-[-1px]">
            TOP <span style={{ color: "#cc2633" }}>SOLDIERS</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-[3rem]">
          {/* Left — Leaderboard Table */}
          <div
            className="border transition-all duration-300"
            style={{
              border: "2px solid rgba(212, 175, 55, 0.2)",
              background: "linear-gradient(135deg, rgba(26, 26, 26, 0.8), rgba(42, 42, 42, 0.6))",
            }}
          >
            {/* Header */}
            <div className="flex items-center px-8 py-5 bg-[rgba(26, 26, 26, 0.95)] border-b border-[rgba(212, 175, 55, 0.2)] font-mono text-[0.75rem] tracking-[3px] text-[#d4af37] uppercase">
              <div className="flex-1">RANK · SOLDIER</div>
              <div className="w-[80px] text-center">VICTORIES</div>
              <div className="w-[120px] text-right">ELO RATING</div>
            </div>

            {/* Rows */}
            <div className="flex flex-col">
              {players.map((p, i) => {
                const rank = i + 1;
                const colors = getRankColor(rank);
                const initials = p.name.substring(0, 2).toUpperCase();
                return (
                  <div
                    key={p.name}
                    className="flex items-center px-8 py-5 border-b border-[rgba(212, 175, 55, 0.1)] last:border-0 hover:bg-[rgba(212, 175, 55, 0.05)] transition-all duration-200 group cursor-pointer"
                  >
                    {/* Rank */}
                    <div
                      className="font-black text-2xl w-[50px] text-center"
                      style={{ color: colors.color, textShadow: `0 0 20px ${colors.color}80` }}
                    >
                      #{rank}
                    </div>

                    {/* Avatar */}
                    <div
                      className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-display text-sm font-bold mr-4 transition-all"
                      style={{
                        borderColor: colors.border,
                        background: `rgba(212, 175, 55, 0.1)`,
                        color: colors.color,
                      }}
                    >
                      {initials}
                    </div>

                    {/* Player Info */}
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="font-body font-bold text-[1rem] text-white group-hover:text-[#d4af37] transition-colors">
                        {p.name}
                      </div>
                      <div className="font-mono text-[0.7rem] text-[#a9a9a0]">
                        {p.rank} · Fav: {p.fav}
                      </div>
                    </div>

                    {/* Wins */}
                    <div className="w-[80px] text-center font-mono text-[0.9rem] font-bold text-[#2db84d]">
                      {p.wins}W
                    </div>

                    {/* ELO */}
                    <div
                      className="w-[120px] text-right font-display text-[1.3rem] font-black tracking-[2px] transition-all"
                      style={{ color: colors.color }}
                    >
                      {p.elo}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — Sidebar Widgets */}
          <div className="flex flex-col gap-8">
            {/* Widget 1 — Live Matches */}
            <div
              className="border p-6 transition-all duration-300"
              style={{
                border: "2px solid rgba(45, 184, 77, 0.3)",
                background: "linear-gradient(135deg, rgba(26, 26, 26, 0.8), rgba(42, 42, 42, 0.6))",
              }}
            >
              <h4 className="font-mono text-[0.75rem] tracking-[3px] text-[#2db84d] uppercase mb-6 flex items-center gap-2">
                🔴 <span>LIVE BATTLES</span>
              </h4>
              <div className="flex flex-col gap-0">
                {liveMatches.map((m, i) => (
                  <div
                    key={i}
                    className="flex items-center py-4 border-b border-[rgba(45, 184, 77, 0.1)] last:border-0 hover:bg-[rgba(45, 184, 77, 0.05)] transition-colors px-3 rounded"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#cc2633] animate-pulse mr-3"></div>
                    <div className="font-body text-[0.85rem] flex-1 min-w-0">
                      <span style={{ color: m.p1.color }} className="font-semibold">
                        {m.p1.name}
                      </span>
                      <span className="text-[#6b6b6b] mx-1.5">⚔️</span>
                      <span style={{ color: m.p2.color }} className="font-semibold">
                        {m.p2.name}
                      </span>
                    </div>
                    <div className="font-mono text-[0.65rem] text-[#a9a9a0] ml-auto whitespace-nowrap">
                      {m.meta}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget 2 — Most Used Commands */}
            <div
              className="border p-6 transition-all duration-300"
              style={{
                border: "2px solid rgba(204, 38, 51, 0.3)",
                background: "linear-gradient(135deg, rgba(26, 26, 26, 0.8), rgba(42, 42, 42, 0.6))",
              }}
            >
              <h4 className="font-mono text-[0.75rem] tracking-[3px] text-[#cc2633] uppercase mb-6 flex items-center gap-2">
                ⚔️ <span>FAVORITE TACTICS</span>
              </h4>
              <div className="flex flex-col gap-5">
                {commandsStats.map((c) => (
                  <div key={c.cmd}>
                    <div className="flex justify-between mb-2">
                      <div className="font-mono text-[0.8rem] text-white font-semibold">{c.cmd}</div>
                      <div className="font-mono text-[0.8rem] font-bold" style={{ color: c.color }}>
                        {c.pct}%
                      </div>
                    </div>
                    <div className="w-full h-2 bg-[rgba(107, 107, 107, 0.3)] rounded-full overflow-hidden border border-[rgba(107, 107, 107, 0.2)]">
                      <div
                        className="h-full transition-all duration-1000 ease-out rounded-full"
                        style={{
                          width: showBars ? `${c.pct}%` : "0%",
                          background: `linear-gradient(90deg, ${c.color}, ${c.color}80)`,
                          boxShadow: `0 0 10px ${c.color}50`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
