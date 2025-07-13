import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import Header from "@/components/layout/header";
import WellnessDashboard from "@/components/wellness/wellness-dashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Heart, Leaf, Wind, Star, CheckCircle, Sparkles, Target } from "lucide-react";
import type { Habit, HabitEntry } from "@shared/schema";

export default function Wellness() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const queryClient = useQueryClient();
  const [newHabit, setNewHabit] = useState({ name: "", description: "", category: "", targetFrequency: "daily" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("inspiration");

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

  const { data: habits = [] } = useQuery<Habit[]>({
    queryKey: ["/api/habits"],
    enabled: isAuthenticated,
  });

  const { data: todayEntries = [] } = useQuery<HabitEntry[]>({
    queryKey: ["/api/habit-entries", new Date().toISOString().split('T')[0]],
    enabled: isAuthenticated,
  });

  const createHabitMutation = useMutation({
    mutationFn: async (habitData: { name: string; description: string; category: string; targetFrequency: string }) => {
      await apiRequest("POST", "/api/habits", habitData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/habits"] });
      setNewHabit({ name: "", description: "", category: "", targetFrequency: "daily" });
      setIsDialogOpen(false);
      toast({
        title: "Success",
        description: "Habit created successfully!",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
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
      toast({
        title: "Error",
        description: "Failed to create habit",
        variant: "destructive",
      });
    },
  });

  const completeHabitMutation = useMutation({
    mutationFn: async (habitId: number) => {
      await apiRequest("POST", "/api/habit-entries", { habitId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/habit-entries"] });
      toast({
        title: "Great job!",
        description: "Habit completed for today!",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
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
      toast({
        title: "Error",
        description: "Failed to complete habit",
        variant: "destructive",
      });
    },
  });

  const handleCreateHabit = () => {
    if (!newHabit.name.trim() || !newHabit.category.trim()) return;
    createHabitMutation.mutate(newHabit);
  };

  const isHabitCompletedToday = (habitId: number) => {
    return todayEntries.some(entry => entry.habitId === habitId);
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'meditation':
        return <Leaf className="w-5 h-5" />;
      case 'exercise':
        return <Heart className="w-5 h-5" />;
      case 'breathing':
        return <Wind className="w-5 h-5" />;
      case 'creative':
        return <Star className="w-5 h-5" />;
      default:
        return <Heart className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'meditation':
        return 'bg-green-500/20 text-green-400';
      case 'exercise':
        return 'bg-red-500/20 text-red-400';
      case 'breathing':
        return 'bg-blue-500/20 text-blue-400';
      case 'creative':
        return 'bg-purple-500/20 text-purple-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
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

  return (
    <div className="min-h-screen pb-20 luminous-gradient">
      <Header />
      
      <main className="px-4 pb-8">
        <div className="text-center py-6 mb-6">
          <h1 className="text-2xl font-semibold text-white mb-2">Wellness & Mindfulness</h1>
          <p className="text-secondary">Your personalized journey to inner peace and well-being</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-secondary/20">
            <TabsTrigger value="inspiration" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
              <Sparkles className="w-4 h-4 mr-2" />
              Inspiration
            </TabsTrigger>
            <TabsTrigger value="habits" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
              <Target className="w-4 h-4 mr-2" />
              Habits
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inspiration" className="space-y-6">
            <WellnessDashboard />
          </TabsContent>

          <TabsContent value="habits" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Your Wellness Habits</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-teal-600 hover:bg-teal-700">
                    <Plus className="w-4 h-4 mr-2" />
                    New Habit
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-effect border-white/10">
                  <DialogHeader>
                    <DialogTitle className="text-white">Create New Habit</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Habit name"
                      value={newHabit.name}
                      onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                      className="bg-secondary border-white/10 text-white"
                    />
                    <Input
                      placeholder="Description (optional)"
                      value={newHabit.description}
                      onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
                      className="bg-secondary border-white/10 text-white"
                    />
                    <Select value={newHabit.category} onValueChange={(value) => setNewHabit({ ...newHabit, category: value })}>
                      <SelectTrigger className="bg-secondary border-white/10 text-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meditation">Meditation</SelectItem>
                        <SelectItem value="exercise">Exercise</SelectItem>
                        <SelectItem value="breathing">Breathing</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                        <SelectItem value="nutrition">Nutrition</SelectItem>
                        <SelectItem value="sleep">Sleep</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={newHabit.targetFrequency} onValueChange={(value) => setNewHabit({ ...newHabit, targetFrequency: value })}>
                      <SelectTrigger className="bg-secondary border-white/10 text-white">
                        <SelectValue placeholder="Target frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      onClick={handleCreateHabit}
                      disabled={createHabitMutation.isPending || !newHabit.name.trim() || !newHabit.category.trim()}
                      className="w-full bg-teal-600 hover:bg-teal-700"
                    >
                      {createHabitMutation.isPending ? "Creating..." : "Create Habit"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Button 
                onClick={() => setActiveTab("inspiration")}
                className="h-16 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 justify-start"
              >
                <Leaf className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Guided Meditation</div>
                  <div className="text-xs opacity-75">Start a session</div>
                </div>
              </Button>
              <Button 
                onClick={() => setActiveTab("inspiration")}
                className="h-16 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 justify-start"
              >
                <Wind className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Breathing Exercises</div>
                  <div className="text-xs opacity-75">Focus your mind</div>
                </div>
              </Button>
              <Button className="h-16 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400 justify-start">
                <Star className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Creative Flow</div>
                  <div className="text-xs opacity-75">Unlock inspiration</div>
                </div>
              </Button>
            </div>

            {/* Habits List */}
            {habits.length === 0 ? (
              <Card className="glass-effect border-white/10">
                <CardContent className="p-8 text-center">
                  <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No Habits Yet</h3>
                  <p className="text-muted-foreground mb-4">Create your first wellness habit to start tracking</p>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-teal-600 hover:bg-teal-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Habit
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {habits.map((habit) => {
                  const isCompleted = isHabitCompletedToday(habit.id);
                  
                  return (
                    <Card key={habit.id} className="glass-effect border-white/10">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getCategoryColor(habit.category)}`}>
                              {getCategoryIcon(habit.category)}
                            </div>
                            <div>
                              <h3 className="font-medium text-white">{habit.name}</h3>
                              {habit.description && (
                                <p className="text-sm text-secondary">{habit.description}</p>
                              )}
                              <div className="flex items-center space-x-2 mt-1">
                                <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(habit.category)}`}>
                                  {habit.category}
                                </span>
                                <span className="text-xs text-secondary">{habit.targetFrequency}</span>
                              </div>
                            </div>
                          </div>
                          
                          <Button
                            onClick={() => completeHabitMutation.mutate(habit.id)}
                            disabled={isCompleted || completeHabitMutation.isPending}
                            className={`${
                              isCompleted 
                                ? 'bg-green-500/20 text-green-400 cursor-not-allowed' 
                                : 'bg-teal-600 hover:bg-teal-700'
                            }`}
                          >
                            {isCompleted ? (
                              <>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Completed
                              </>
                            ) : (
                              'Mark Complete'
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
