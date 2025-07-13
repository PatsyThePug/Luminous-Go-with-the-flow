import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, FolderOpen } from "lucide-react";
import type { Project, Task } from "@shared/schema";

export default function Projects() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const queryClient = useQueryClient();
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const { data: projects = [], isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
    enabled: isAuthenticated,
  });

  const { data: tasks = [] } = useQuery<Task[]>({
    queryKey: ["/api/tasks"],
    enabled: isAuthenticated,
  });

  const createProjectMutation = useMutation({
    mutationFn: async (projectData: { name: string; description: string }) => {
      await apiRequest("POST", "/api/projects", projectData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setNewProject({ name: "", description: "" });
      setIsDialogOpen(false);
      toast({
        title: "Success",
        description: "Project created successfully!",
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
        description: "Failed to create project",
        variant: "destructive",
      });
    },
  });

  const handleCreateProject = () => {
    if (!newProject.name.trim()) return;
    createProjectMutation.mutate(newProject);
  };

  const getProjectTaskCount = (projectId: number) => {
    return tasks.filter(task => task.projectId === projectId).length;
  };

  const getProjectCompletedTasks = (projectId: number) => {
    return tasks.filter(task => task.projectId === projectId && task.completed).length;
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
    <div className="min-h-screen pb-20">
      <Header />
      
      <main className="px-4 pb-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold text-white">Creative Projects</h1>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-effect border-white/10">
                <DialogHeader>
                  <DialogTitle className="text-white">Create New Project</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Project name"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    className="bg-secondary border-white/10 text-white"
                  />
                  <Textarea
                    placeholder="Project description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="bg-secondary border-white/10 text-white"
                  />
                  <Button 
                    onClick={handleCreateProject}
                    disabled={createProjectMutation.isPending || !newProject.name.trim()}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {createProjectMutation.isPending ? "Creating..." : "Create Project"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {projectsLoading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <Card className="glass-effect border-white/10">
            <CardContent className="p-8 text-center">
              <FolderOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No Projects Yet</h3>
              <p className="text-muted-foreground mb-4">Create your first creative project to get started</p>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Project
                  </Button>
                </DialogTrigger>
              </Dialog>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const totalTasks = getProjectTaskCount(project.id);
              const completedTasks = getProjectCompletedTasks(project.id);
              const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

              return (
                <Card key={project.id} className="glass-effect border-white/10 card-hover">
                  <CardHeader>
                    <CardTitle className="text-white">{project.name}</CardTitle>
                    {project.description && (
                      <p className="text-sm text-secondary">{project.description}</p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-secondary">Progress</span>
                        <span className="text-white">{completedTasks}/{totalTasks}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="progress-bar h-full rounded-full transition-all duration-300" 
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-secondary">
                        <span>Created {new Date(project.createdAt!).toLocaleDateString()}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          project.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
