import { apiUrl } from "../../lib/api";

export function EnterArenaSection({ user }: { user: any }) {
  return (
    <section id="join-section" className="relative w-full py-[8rem] px-[4rem] border-b border-gb-border overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(0,255,136,0.03),transparent_70%)]">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <div className="font-display text-[clamp(8rem,20vw,20rem)] text-[rgba(255,255,255,0.012)] tracking-[10px] select-none leading-none">
          GITBATTLE
        </div>
      </div>

      <div className="relative z-10 max-w-[1300px] mx-auto text-center flex flex-col items-center">
        {/* Header */}
        <div className="flex flex-col items-center mb-[4rem]">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[0.75rem] tracking-[4px] text-gb-green uppercase">Ready?</span>
          </div>
          <h2 className="font-display text-[clamp(3rem,8vw,6rem)] text-white leading-none tracking-[4px] mb-6">
            ENTER THE <span className="text-gb-green">ARENA</span>
          </h2>
          <p className="font-body text-[1.1rem] text-gb-muted">
            Are you running this session or stepping onto the battlefield? Choose your role.
          </p>
        </div>

        {/* Split CTA */}
        <div className="flex w-full max-w-[600px] h-[160px] group">
          {/* Left Panel — Host */}
          <a
            href={user ? "/dashboard/host" : apiUrl("/auth/github")}
            className="flex-1 flex flex-col items-center justify-center border border-[rgba(255,68,85,0.3)] border-r-0 bg-gradient-to-br from-[rgba(255,68,85,0.15)] to-[rgba(255,68,85,0.03)] transition-all duration-400 ease-out hover:flex-[1.4] hover:bg-[rgba(255,68,85,0.2)]"
          >
            <div className="text-[2.5rem] mb-2">🏛️</div>
            <div className="font-display text-[1.4rem] tracking-[4px] text-gb-red mb-1">HOST A BATTLE</div>
            <div className="font-mono text-[0.7rem] tracking-[2px] text-gb-muted hidden sm:block">Create a room · Manage players</div>
          </a>

          <div className="w-[1px] h-full bg-gb-border"></div>

          {/* Right Panel — Join */}
          <a
            href={user ? "/dashboard" : apiUrl("/auth/github")}
            className="flex-1 flex flex-col items-center justify-center border border-[rgba(0,255,136,0.3)] border-l-0 bg-gradient-to-br from-[rgba(0,255,136,0.08)] to-[rgba(0,255,136,0.01)] transition-all duration-400 ease-out hover:flex-[1.4] hover:bg-[rgba(0,255,136,0.15)]"
          >
            <div className="text-[2.5rem] mb-2">⚔️</div>
            <div className="font-display text-[1.4rem] tracking-[4px] text-gb-green mb-1">JOIN AS PLAYER</div>
            <div className="font-mono text-[0.7rem] tracking-[2px] text-gb-muted hidden sm:block">Login with GitHub · Battle</div>
          </a>
        </div>
      </div>
    </section>
  );
}
