import { useAuth } from "@/hooks/useAuth";
import { User } from "lucide-react";

export default function Header() {
  const { user } = useAuth();

  const getUserDisplayName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user?.firstName) {
      return user.firstName;
    }
    if (user?.email) {
      const emailName = user.email.split('@')[0];
      return emailName.charAt(0).toUpperCase() + emailName.slice(1);
    }
    return 'User';
  };

  return (
    <header className="p-4 pt-8 pb-6">
      {/* Logo Section */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center space-x-3">
          <img 
            src="/logo.svg" 
            alt="Luminous Logo" 
            className="w-12 h-12 logo-animation"
          />
          <h1 className="text-3xl font-bold text-white tracking-wide">LUMINOUS</h1>
        </div>
      </div>
      
      {/* User Profile Section */}
      <div className="flex items-center justify-center space-x-4 bg-secondary/30 backdrop-blur-lg rounded-2xl p-5 border border-white/10 user-profile-glow">
        <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-primary shadow-lg user-profile-glow">
          {user?.profileImageUrl ? (
            <img 
              src={user.profileImageUrl} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/40 to-green-400/40 flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
          )}
        </div>
        
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-1">
            {getUserDisplayName()}
          </h2>
          <p className="text-sm text-secondary opacity-80">
            Welcome back!
          </p>
        </div>
      </div>
    </header>
  );
}
