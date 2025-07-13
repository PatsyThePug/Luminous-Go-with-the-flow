import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, Palette, Heart, Sparkles, Users, Trophy, Brain } from "lucide-react";

export default function BottomNavigation() {
  const [location, setLocation] = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Inicio" },
    { path: "/projects", icon: Palette, label: "Proyectos" },
    { path: "/wellness", icon: Heart, label: "Bienestar" },
    { path: "/inspiration", icon: Sparkles, label: "Inspiración" },
    { path: "/community", icon: Users, label: "Comunidad" },
    { path: "/challenges", icon: Trophy, label: "Desafíos" },
    { path: "/meditation", icon: Brain, label: "Meditación" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-gray-700 z-50">
      <div className="grid grid-cols-7 gap-1 px-1 py-2 max-w-screen-xl mx-auto">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location === path;
          
          return (
            <Button
              key={path}
              onClick={() => setLocation(path)}
              variant="ghost"
              className={`flex flex-col items-center gap-1 p-1 h-auto text-[10px] ${
                isActive 
                  ? 'text-cyan-400 bg-cyan-500/10' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium leading-tight text-center">{label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}
