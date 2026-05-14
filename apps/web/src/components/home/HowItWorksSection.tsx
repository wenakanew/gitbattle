export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      icon: "🔐",
      title: "AUTHENTICATE",
      color: "#2db84d",
      desc: "Connect your GitHub identity. Your reputation is your armor. Contribution history becomes your battle record.",
      icon_emoji: "🛡️"
    },
    {
      number: "02",
      icon: "🎖",
      title: "DEPLOY",
      color: "#d4af37",
      desc: "Select your battle class and join a squad. Wait in the war room as commanders assemble matchups. Watch others battle.",
      icon_emoji: "⚔️"
    },
    {
      number: "03",
      icon: "🔥",
      title: "EXECUTE",
      color: "#cc2633",
      desc: "When engaged, enter the arena and type real Git commands. Every keystroke is a tactical move. Outthink. Outmaneuver. Win.",
      icon_emoji: "💣"
    }
  ];

  return (
    <section id="how-it-works" className="w-full px-[4rem] py-[8rem] border-b border-[rgba(212, 175, 55, 0.1)] relative overflow-hidden">
      {/* Atmospheric background */}
      <div className="absolute inset-0 war-smoke opacity-15 pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-3 h-3 bg-[#2db84d]"></div>
            <span className="font-mono text-[0.8rem] tracking-[5px] text-[#2db84d] uppercase">MISSION PROTOCOL</span>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-[#2db84d] to-transparent"></div>
          </div>

          <h2 className="font-black text-[clamp(2.5rem, 6vw, 4rem)] leading-[1.1] text-white mb-6 tracking-[-1px]">
            HOW TO <span style={{ color: "#d4af37" }}>DOMINATE</span><br />
            <span style={{ color: "#2db84d" }}>THE WARZONE</span>
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-[2rem] mb-12">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="group relative overflow-hidden transition-all duration-500 cursor-pointer"
              style={{
                border: `2px solid rgba(212, 175, 55, 0.2)`,
                background: `linear-gradient(135deg, rgba(26, 26, 26, 0.9), rgba(42, 42, 42, 0.7))`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = `2px solid ${step.color}`;
                e.currentTarget.style.boxShadow = `0 0 50px ${step.color}, inset 0 0 30px rgba(0, 0, 0, 0.3)`;
                e.currentTarget.style.transform = "translateY(-8px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = `2px solid rgba(212, 175, 55, 0.2)`;
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Accent bar */}
              <div
                className="absolute top-0 left-0 w-full h-[4px] group-hover:h-[6px] transition-all"
                style={{ background: step.color }}
              ></div>

              {/* Background glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"
                style={{ background: step.color }}
              ></div>

              <div className="p-8 relative z-10 h-full flex flex-col">
                {/* Step number */}
                <div className="flex items-center justify-between mb-8">
                  <div
                    className="font-black text-5xl opacity-20 tracking-tighter"
                    style={{ color: step.color }}
                  >
                    {step.number}
                  </div>
                  <div className="text-3xl">{step.icon_emoji}</div>
                </div>

                {/* Title */}
                <h3
                  className="font-black text-2xl tracking-[2px] mb-4 transition-colors"
                  style={{ color: step.color }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p className="font-body text-[0.95rem] text-[#a9a9a0] leading-[1.7] flex-1">
                  {step.desc}
                </p>

                {/* Arrow indicator */}
                {idx < steps.length - 1 && (
                  <div className="mt-6 text-[#d4af37] font-mono text-lg opacity-50 group-hover:opacity-100 transition-opacity">
                    ▼ NEXT ▼
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Connection visualization */}
        <div className="relative h-32 hidden md:block">
          <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="xMidYMid meet">
            {/* Connecting arrows */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#d4af37" />
              </marker>
            </defs>
            <line x1="250" y1="10" x2="450" y2="10" stroke="#d4af37" strokeWidth="2" markerEnd="url(#arrowhead)" opacity="0.5" />
            <line x1="750" y1="10" x2="950" y2="10" stroke="#d4af37" strokeWidth="2" markerEnd="url(#arrowhead)" opacity="0.5" />
          </svg>
        </div>

        {/* Deployment note */}
        <div className="bg-[rgba(45, 184, 77, 0.08)] border-2 border-[#2db84d] p-6 text-center">
          <p className="font-mono text-sm text-[#2db84d] tracking-[1px]">
            ✓ Each step typically takes 30-60 seconds. Create or join a room and start your first battle in under 2 minutes.
          </p>
        </div>
      </div>
    </section>
  );
}
