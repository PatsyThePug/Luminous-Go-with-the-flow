import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddTaskModal from "@/components/modals/add-task-modal";
import type { Project, Task } from "@shared/schema";

export default function CreativeProjects() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: tasks = [] } = useQuery<Task[]>({
    queryKey: ["/api/tasks"],
  });

  // Sample projects for display
  const sampleProjects = [
    { name: "Current Board", completed: 2, total: 4, progress: 50 },
    { name: "Sketch Ideas", completed: 3, total: 3, progress: 100 },
    { name: "Research Concepts", completed: 0, total: 3, progress: 0 },
    { name: "Refine Design", completed: 0, total: 0, progress: 0 },
  ];

  const getProjectProgress = (projectId: number) => {
    const projectTasks = tasks.filter(task => task.projectId === projectId);
    const completedTasks = projectTasks.filter(task => task.completed);
    return projectTasks.length > 0 ? (completedTasks.length / projectTasks.length) * 100 : 0;
  };

  const getProjectTaskCount = (projectId: number) => {
    const projectTasks = tasks.filter(task => task.projectId === projectId);
    const completedTasks = projectTasks.filter(task => task.completed);
    return { completed: completedTasks.length, total: projectTasks.length };
  };

  return (
    <Card className="glass-effect border-white/10 card-hover">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-secondary uppercase tracking-wide">
          CREATIVE PROJECTS
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.length > 0 ? (
            projects.map((project) => {
              const { completed, total } = getProjectTaskCount(project.id);
              const progress = getProjectProgress(project.id);
              
              return (
                <div key={project.id} className="flex items-center justify-between p-3 bg-secondary rounded-xl">
                  <span className="font-medium text-white">{project.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-secondary text-sm">{completed}/{total}</span>
                    <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="progress-bar h-full rounded-full transition-all duration-300" 
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            // Show sample projects when no real projects exist
            sampleProjects.map((project, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-xl">
                <span className="font-medium text-white">{project.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-secondary text-sm">
                    {project.total > 0 ? `${project.completed}/${project.total}` : project.completed}
                  </span>
                  <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="progress-bar h-full rounded-full" 
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <Button 
          onClick={() => setIsAddTaskOpen(true)}
          className="flex items-center space-x-2 mt-4 text-primary hover:text-blue-400 transition-colors bg-transparent hover:bg-transparent p-0"
        >
          <Plus className="w-4 h-4" />
          <span className="font-medium">Add Task</span>
        </Button>

        <AddTaskModal 
          isOpen={isAddTaskOpen}
          onClose={() => setIsAddTaskOpen(false)}
        />
      </CardContent>
    </Card>
  );
}
