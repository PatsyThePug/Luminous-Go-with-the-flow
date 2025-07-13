import HeaderSimple from "@/components/layout/header-simple";
import TodayOverviewSimple from "@/components/dashboard/today-overview-simple";
import CreativeProjectsSimple from "@/components/dashboard/creative-projects-simple";
import WellbeingRitualsSimple from "@/components/dashboard/wellbeing-rituals-simple";
import CommunityChallenges from "@/components/dashboard/community-challenges";
import CommunitySection from "@/components/dashboard/community-section";
import MindMappingCard from "@/components/dashboard/mind-mapping-card";

export default function DashboardSimple() {
  return (
    <div className="min-h-screen pb-20 luminous-gradient">
      <HeaderSimple />
      
      <main className="px-4 pb-8 max-w-7xl mx-auto">
        {/* Layout exacto de la imagen de referencia - 2 columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Columna izquierda - Today's Overview, Creative Projects, Community Amping */}
          <div className="space-y-6">
            <TodayOverviewSimple />
            <CreativeProjectsSimple />
            <CommunityChallenges />
          </div>
          
          {/* Columna derecha - Wellbeing Rituals, Mind Mapping, Community & Challenges */}
          <div className="space-y-6">
            <WellbeingRitualsSimple />
            <MindMappingCard />
            <CommunitySection />
          </div>
        </div>
      </main>
    </div>
  );
}