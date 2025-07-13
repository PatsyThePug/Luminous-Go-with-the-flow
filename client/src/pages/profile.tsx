import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, User, Settings, BarChart3, Award, Calendar } from "lucide-react";
import type { Project, Habit, CommunityPost } from "@shared/schema";

export default function Profile() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();

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

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
    enabled: isAuthenticated,
  });

  const { data: habits = [] } = useQuery<Habit[]>({
    queryKey: ["/api/habits"],
    enabled: isAuthenticated,
  });

  const { data: posts = [] } = useQuery<CommunityPost[]>({
    queryKey: ["/api/community/posts"],
    enabled: isAuthenticated,
  });

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const getCompletedProjectsCount = () => {
    return projects.filter(p => p.status === 'completed').length;
  };

  const getActiveHabitsCount = () => {
    return habits.filter(h => h.isActive).length;
  };

  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <main className="px-4 pb-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="glass-effect border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 rounded-full overflow-hidden border-3 border-primary shadow-lg user-profile-glow">
                  {user?.profileImageUrl ? (
                    <img 
                      src={user.profileImageUrl} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/40 to-green-400/40 flex items-center justify-center">
                      <User className="w-12 h-12 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-white mb-2">
                    {user?.firstName && user?.lastName 
                      ? `${user.firstName} ${user.lastName}`
                      : user?.email?.split('@')[0].charAt(0).toUpperCase() + user?.email?.split('@')[0].slice(1) || 'Welcome!'
                    }
                  </h1>
                  {user?.email && (
                    <p className="text-secondary text-lg">{user.email}</p>
                  )}
                  <p className="text-sm text-muted-foreground mt-2">
                    Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}
                  </p>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-effect border-white/10">
            <CardContent className="p-4 text-center">
              <BarChart3 className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{projects.length}</div>
              <div className="text-sm text-secondary">Projects</div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/10">
            <CardContent className="p-4 text-center">
              <Award className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{getCompletedProjectsCount()}</div>
              <div className="text-sm text-secondary">Completed</div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/10">
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{getActiveHabitsCount()}</div>
              <div className="text-sm text-secondary">Active Habits</div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/10">
            <CardContent className="p-4 text-center">
              <User className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{posts.length}</div>
              <div className="text-sm text-secondary">Posts</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Projects */}
          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Recent Projects</CardTitle>
            </CardHeader>
            <CardContent>
              {projects.length === 0 ? (
                <p className="text-muted-foreground text-sm">No projects yet</p>
              ) : (
                <div className="space-y-3">
                  {projects.slice(0, 3).map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <div>
                        <h4 className="font-medium text-white text-sm">{project.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          Created {new Date(project.createdAt!).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        project.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Habits */}
          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Wellness Habits</CardTitle>
            </CardHeader>
            <CardContent>
              {habits.length === 0 ? (
                <p className="text-muted-foreground text-sm">No habits yet</p>
              ) : (
                <div className="space-y-3">
                  {habits.slice(0, 3).map((habit) => (
                    <div key={habit.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <div>
                        <h4 className="font-medium text-white text-sm">{habit.name}</h4>
                        <p className="text-xs text-muted-foreground">{habit.targetFrequency}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400`}>
                        {habit.category}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Settings Section */}
        <Card className="glass-effect border-white/10 mt-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start border-white/20 text-white hover:bg-white/10">
                <User className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" className="w-full justify-start border-white/20 text-white hover:bg-white/10">
                <Settings className="w-4 h-4 mr-2" />
                Preferences
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
