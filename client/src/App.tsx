import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import DashboardSimple from "@/pages/dashboard-simple";
import BottomNavigation from "@/components/layout/bottom-navigation";
import { useCapacitor } from "@/hooks/useCapacitor";

import Projects from "@/pages/projects";
import Wellness from "@/pages/wellness";
import Inspiration from "@/pages/inspiration";
import Community from "@/pages/community";
import Challenges from "@/pages/challenges";
import Meditation from "@/pages/meditation";

function Router() {
  const { isNative, platform } = useCapacitor();
  
  return (
    <div className={`min-h-screen luminous-gradient ${isNative ? 'native-app' : 'web-app'}`}>
      <Switch>
        <Route path="/" component={DashboardSimple} />
        <Route path="/projects" component={Projects} />
        <Route path="/wellness" component={Wellness} />
        <Route path="/inspiration" component={Inspiration} />
        <Route path="/community" component={Community} />
        <Route path="/challenges" component={Challenges} />
        <Route path="/meditation" component={Meditation} />
        <Route component={NotFound} />
      </Switch>
      <BottomNavigation />
      
      {/* Platform indicator for development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-0 right-0 bg-black/50 text-white px-2 py-1 text-xs z-50">
          {platform} {isNative ? '(native)' : '(web)'}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;
