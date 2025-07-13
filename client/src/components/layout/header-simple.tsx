import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import luminousLogo from "@assets/1_1752378827956.png";

export default function HeaderSimple() {
  return (
    <header className="flex items-center justify-between p-6 max-w-7xl mx-auto">
      {/* Logo y título */}
      <div className="flex items-center space-x-3">
        <img 
          src={luminousLogo} 
          alt="Luminous Neurodiversity Logo" 
          className="w-12 h-12 object-contain"
        />
        <div className="flex flex-col">
          <span className="text-xl font-bold text-white tracking-wide">LUMINOUS</span>
          <span className="text-sm text-white/70">neurodiversity</span>
        </div>
      </div>

      {/* Información del usuario */}
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <h2 className="text-xl font-semibold text-white">Welcome Back, Donna</h2>
          <p className="text-white/60 text-sm">donna@luminous</p>
        </div>
        <Avatar className="w-12 h-12">
          <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" />
          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white font-medium">
            D
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}