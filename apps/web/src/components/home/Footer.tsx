export function Footer() {
  return (
    <footer className="w-full px-[4rem] py-[4rem] border-t border-[rgba(212, 175, 55, 0.1)] bg-[rgba(10, 10, 10, 0.8)]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* Left: Branding */}
          <div>
            <div className="font-black text-2xl tracking-[2px] mb-4">
              <span style={{ color: "#d4af37", textShadow: "0 0 20px rgba(212, 175, 55, 0.3)" }}>GIT</span>
              <span className="text-white">BATTLE</span>
            </div>
            <p className="font-body text-sm text-[#a9a9a0] max-w-xs">
              Master Git through digital warfare. Learn real commands. Defeat real opponents. Claim eternal glory.
            </p>
          </div>

          {/* Center: Quick Links */}
          <div>
            <h4 className="font-mono text-xs tracking-[3px] text-[#d4af37] uppercase mb-4 font-bold">Resources</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="#" className="font-body text-sm text-[#a9a9a0] hover:text-[#d4af37] transition-colors">
                  GitHub Repository
                </a>
              </li>
              <li>
                <a href="#" className="font-body text-sm text-[#a9a9a0] hover:text-[#d4af37] transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="font-body text-sm text-[#a9a9a0] hover:text-[#d4af37] transition-colors">
                  Git Guide
                </a>
              </li>
              <li>
                <a href="#" className="font-body text-sm text-[#a9a9a0] hover:text-[#d4af37] transition-colors">
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Right: Connect */}
          <div>
            <h4 className="font-mono text-xs tracking-[3px] text-[#d4af37] uppercase mb-4 font-bold">Command Center</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="#" className="font-body text-sm text-[#a9a9a0] hover:text-[#d4af37] transition-colors">
                  Status Page
                </a>
              </li>
              <li>
                <a href="#" className="font-body text-sm text-[#a9a9a0] hover:text-[#d4af37] transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="font-body text-sm text-[#a9a9a0] hover:text-[#d4af37] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="font-body text-sm text-[#a9a9a0] hover:text-[#d4af37] transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom divider and copyright */}
        <div className="border-t border-[rgba(212, 175, 55, 0.1)] pt-8 mt-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 md:gap-0">
            <p className="font-mono text-xs tracking-[2px] text-[#6b6b6b] uppercase">
              © 2026 GITBATTLE · <span style={{ color: "#cc2633" }}>⚔️</span> BUILT WITH WARFARE AND GIT
            </p>
            <div className="flex gap-8 font-mono text-xs tracking-[2px] text-[#6b6b6b] uppercase">
              <span>SECTOR: GLOBAL</span>
              <span>STATUS: ONLINE</span>
              <span style={{ color: "#2db84d" }}>● LIVE</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
