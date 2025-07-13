import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Project } from "@shared/schema";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    projectId: "",
    priority: "medium",
  });

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const createTaskMutation = useMutation({
    mutationFn: async (data: { title: string; description: string; projectId: number; priority: string }) => {
      await apiRequest("POST", "/api/tasks", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setTaskData({ title: "", description: "", projectId: "", priority: "medium" });
      onClose();
      toast({
        title: "Success",
        description: "Task created successfully!",
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
        description: "Failed to create task",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    if (!taskData.title.trim() || !taskData.projectId) return;
    
    createTaskMutation.mutate({
      ...taskData,
      projectId: parseInt(taskData.projectId),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-effect border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white">Add New Task</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Task title"
            value={taskData.title}
            onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
            className="bg-secondary border-white/10 text-white"
          />
          <Textarea
            placeholder="Task description (optional)"
            value={taskData.description}
            onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
            className="bg-secondary border-white/10 text-white"
          />
          <Select value={taskData.projectId} onValueChange={(value) => setTaskData({ ...taskData, projectId: value })}>
            <SelectTrigger className="bg-secondary border-white/10 text-white">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id.toString()}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={taskData.priority} onValueChange={(value) => setTaskData({ ...taskData, priority: value })}>
            <SelectTrigger className="bg-secondary border-white/10 text-white">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex space-x-2">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={createTaskMutation.isPending || !taskData.title.trim() || !taskData.projectId}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              {createTaskMutation.isPending ? "Creating..." : "Create Task"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
