import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import DashboardSimple from "@/pages/dashboard-simple";
import Projects from "@/pages/projects";
import Wellness from "@/pages/wellness";
import Community from "@/pages/community";
import Profile from "@/pages/profile";
import BottomNavigation from "@/components/layout/bottom-navigation";

function Router() {
  // Simplified version without authentication

  return (
    <div className="min-h-screen luminous-gradient">
      <Switch>
        <Route path="/" component={DashboardSimple} />
        <Route path="/landing" component={Landing} />
        <Route path="/projects" component={Projects} />
        <Route path="/wellness" component={Wellness} />
        <Route path="/community" component={Community} />
        <Route path="/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
      <BottomNavigation />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
