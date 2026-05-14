import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../lib/api";
import { BattlefieldHero } from "../components/home/BattlefieldHero";
import { BattleModesSection } from "../components/home/BattleModesSection";
import { HowItWorksSection } from "../components/home/HowItWorksSection";
import { CommandCodexSection } from "../components/home/CommandCodexSection";
import { LeaderboardSection } from "../components/home/LeaderboardSection";
import { Footer } from "../components/home/Footer";

export function HomePage() {
  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });

  return (
    <div className="bg-[#0a0a0a]">
      <BattlefieldHero user={user} />
      <BattleModesSection />
      <HowItWorksSection />
      <CommandCodexSection />
      <LeaderboardSection />
      <Footer />
    </div>
  );
}
