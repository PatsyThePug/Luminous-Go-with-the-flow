import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function HeaderSimple() {
  return (
    <header className="flex items-center justify-between p-6 max-w-7xl mx-auto">
      {/* Logo y título */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center">
          <svg 
            viewBox="0 0 24 24" 
            className="w-6 h-6 text-white"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <span className="text-xl font-bold text-white tracking-wide">LUMINOUS</span>
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