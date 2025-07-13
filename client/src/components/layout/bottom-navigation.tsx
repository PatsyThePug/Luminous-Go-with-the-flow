import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, Paintbrush, Heart, Users, User } from "lucide-react";

export default function BottomNavigation() {
  const [location, setLocation] = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/projects", icon: Paintbrush, label: "Projects" },
    { path: "/wellness", icon: Heart, label: "Wellness" },
    { path: "/community", icon: Users, label: "Community" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-secondary/95 backdrop-blur-lg border-t border-white/10 px-4 py-3">
      <div className="flex justify-around max-w-md mx-auto">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location === path;
          
          return (
            <Button
              key={path}
              onClick={() => setLocation(path)}
              variant="ghost"
              className={`flex flex-col items-center space-y-1 p-2 h-auto ${
                isActive 
                  ? 'text-primary' 
                  : 'text-secondary hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}
