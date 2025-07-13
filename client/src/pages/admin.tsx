import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Activity, 
  Calendar, 
  TrendingUp,
  User,
  Mail,
  Clock,
  BarChart3
} from "lucide-react";
import { isUnauthorizedError } from "@/lib/authUtils";

interface UserProfile {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    profileImageUrl: string;
    createdAt: string;
    updatedAt: string;
  };
  stats: {
    projects: number;
    habits: number;
    posts: number;
  };
  recentActivity: {
    projects: any[];
    habits: any[];
    posts: any[];
  };
}

export default function Admin() {
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

  const { data: users, isLoading: usersLoading, error } = useQuery({
    queryKey: ["/api/admin/users"],
    retry: false,
    enabled: isAuthenticated,
  });

  if (error && isUnauthorizedError(error)) {
    toast({
      title: "Access Denied",
      description: "You don't have permission to access this page.",
      variant: "destructive",
    });
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
    return null;
  }

  const getUserProfile = async (userId: string): Promise<UserProfile> => {
    const response = await fetch(`/api/admin/users/${userId}/profile`);
    if (!response.ok) throw new Error('Failed to fetch user profile');
    return response.json();
  };

  if (usersLoading) {
    return (
      <div className="min-h-screen luminous-gradient flex items-center justify-center pb-20">
        <div className="text-white text-lg">Loading admin panel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen luminous-gradient pb-20">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
          <p className="text-white/70">Manage and monitor Luminous platform users</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-effect border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Total Users</p>
                  <p className="text-2xl font-bold text-white">{users?.length || 0}</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Active Today</p>
                  <p className="text-2xl font-bold text-white">
                    {users?.filter((u: any) => 
                      new Date(u.updatedAt).toDateString() === new Date().toDateString()
                    ).length || 0}
                  </p>
                </div>
                <Activity className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">New This Week</p>
                  <p className="text-2xl font-bold text-white">
                    {users?.filter((u: any) => {
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return new Date(u.createdAt) > weekAgo;
                    }).length || 0}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Growth Rate</p>
                  <p className="text-2xl font-bold text-white">+23%</p>
                </div>
                <BarChart3 className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users List */}
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5" />
              All Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users?.map((user: any) => (
                <div 
                  key={user.id} 
                  className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user.profileImageUrl} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white">
                        {user.firstName?.[0] || user.email?.[0]?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <h3 className="font-medium text-white">
                        {user.firstName && user.lastName 
                          ? `${user.firstName} ${user.lastName}` 
                          : user.email?.split('@')[0] || 'Anonymous User'
                        }
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <Mail className="w-3 h-3" />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/50">
                        <Clock className="w-3 h-3" />
                        Joined {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="bg-white/10 text-white">
                      ID: {user.id}
                    </Badge>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white/80 hover:text-white hover:bg-white/10"
                      onClick={async () => {
                        try {
                          const profile = await getUserProfile(user.id);
                          toast({
                            title: "User Profile",
                            description: `Projects: ${profile.stats.projects}, Habits: ${profile.stats.habits}, Posts: ${profile.stats.posts}`,
                          });
                        } catch (error) {
                          toast({
                            title: "Error",
                            description: "Failed to load user profile",
                            variant: "destructive",
                          });
                        }
                      }}
                    >
                      <User className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {(!users || users.length === 0) && (
                <div className="text-center py-8 text-white/50">
                  No users found
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}