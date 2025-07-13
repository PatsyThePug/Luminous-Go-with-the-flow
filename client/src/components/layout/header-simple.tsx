import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import luminousLogo from "@assets/1_1752378827956.png";
import { removeBackground } from "@/utils/imageProcessor";
import { useAuth } from "@/hooks/useAuth";

export default function HeaderSimple() {
  const [transparentLogo, setTransparentLogo] = useState<string>(luminousLogo);
  const { user } = useAuth();

  useEffect(() => {
    removeBackground(luminousLogo).then(setTransparentLogo);
  }, []);

  return (
    <header className="flex items-center justify-between p-6 max-w-7xl mx-auto">
      {/* Logo y título */}
      <div className="flex items-center space-x-3">
        <img 
          src={transparentLogo} 
          alt="Luminous Neurodiversity Logo" 
          className="w-12 h-12 object-contain drop-shadow-lg"
        />
        <div className="flex flex-col">
          <span className="text-xl font-bold text-white tracking-wide">LUMINOUS</span>
          <span className="text-sm text-white/70">neurodiversity</span>
        </div>
      </div>

      {/* Información del usuario */}
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <h2 className="text-xl font-semibold text-white">
            Welcome Back, {user?.firstName || user?.email?.split('@')[0] || 'User'}
          </h2>
          <p className="text-white/60 text-sm">{user?.email}</p>
        </div>
        <Avatar className="w-12 h-12">
          <AvatarImage src={user?.profileImageUrl} />
          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white font-medium">
            {user?.firstName?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
        <Button
          onClick={() => window.location.href = '/api/logout'}
          variant="ghost"
          size="sm"
          className="text-white/80 hover:text-white hover:bg-white/10"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}