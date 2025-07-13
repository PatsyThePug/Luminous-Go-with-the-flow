import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/header";
import TodayOverview from "@/components/dashboard/today-overview";
import CreativeProjects from "@/components/dashboard/creative-projects";
import WellbeingRituals from "@/components/dashboard/wellbeing-rituals";
import CommunityChallenges from "@/components/dashboard/community-challenges";
import CommunitySection from "@/components/dashboard/community-section";
import MindMappingCard from "@/components/dashboard/mind-mapping-card";

export default function Dashboard() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen pb-20 luminous-gradient">
      <Header />
      
      <main className="px-4 pb-8 space-y-4">
        {/* Layout en grid como en la imagen de referencia */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Columna izquierda */}
          <div className="space-y-4">
            <TodayOverview />
            <CreativeProjects />
            <CommunityChallenges />
          </div>
          
          {/* Columna derecha */}
          <div className="space-y-4">
            <WellbeingRituals />
            <MindMappingCard />
            <CommunitySection />
          </div>
        </div>
      </main>
    </div>
  );
}
