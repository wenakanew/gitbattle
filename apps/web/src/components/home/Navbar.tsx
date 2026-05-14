import { Link } from "react-router-dom";
import { apiUrl } from "../../lib/api";

interface NavbarProps {
  user: any;
}

export function Navbar({ user }: NavbarProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-[4rem] h-[4.5rem] bg-[rgba(4,4,10,0.85)] backdrop-blur-[20px] border-b border-gb-border">
      {/* Left side — Logo */}
      <div 
        className="cursor-pointer font-display text-[1.8rem] tracking-[3px] flex items-center"
        onClick={() => scrollToSection("hero")}
      >
        <span className="text-gb-green" style={{ textShadow: "0 0 10px rgba(0,255,136,0.3)" }}>GIT</span>
        <span className="text-white">BATTLE</span>
      </div>

      {/* Center — Navigation Links */}
      <div className="hidden md:flex gap-8">
        {["About", "How It Works", "Commands", "Modes", "Leaderboard"].map((link) => {
          const id = link.toLowerCase().replace(/\s+/g, "-");
          return (
            <button
              key={link}
              onClick={() => scrollToSection(id)}
              className="font-mono text-[0.85rem] tracking-[2px] uppercase text-gb-muted hover:text-gb-green transition-colors duration-300"
            >
              {link}
            </button>
          );
        })}
      </div>

      {/* Right side — CTA Button */}
      <div>
        {user ? (
          <Link
            to="/dashboard"
            className="font-mono text-[0.85rem] tracking-[2px] border border-gb-green text-gb-green px-5 py-2 hover:bg-gb-green hover:text-gb-bg transition-colors duration-300 inline-block"
          >
            ENTER ARENA
          </Link>
        ) : (
          <a
            href={apiUrl("/auth/github")}
            className="font-mono text-[0.85rem] tracking-[2px] border border-gb-green text-gb-green px-5 py-2 hover:bg-gb-green hover:text-gb-bg transition-colors duration-300 inline-block"
          >
            ENTER ARENA
          </a>
        )}
      </div>
    </nav>
  );
}
