import { useAuth } from "@/hooks/useAuth";
import { Brain, User } from "lucide-react";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between p-4 pt-12">
      <div className="flex items-center space-x-3">
        <Brain className="text-2xl brain-icon" />
        <h1 className="text-xl font-semibold text-white">LUMINOUS</h1>
      </div>
      
      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
        {user?.profileImageUrl ? (
          <img 
            src={user.profileImageUrl} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-primary/20 flex items-center justify-center">
            <User className="w-6 h-6 text-primary" />
          </div>
        )}
      </div>
    </header>
  );
}
