import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus } from "lucide-react";

export default function CreativeProjectsSimple() {
  // Exact projects from the reference image
  const projects = [
    { name: "Current Board", completed: 2, total: 4 },
    { name: "Sketch Ideas", completed: 3, total: 3 },
    { name: "Research Concepts", completed: 0, total: 3 },
    { name: "Refine Design", completed: 0, total: 1 },
  ];

  return (
    <Card className="glass-effect border-white/10 card-hover bg-gradient-to-br from-indigo-700/50 to-indigo-900/50">
      <CardContent className="p-6">
        <h2 className="text-sm font-medium text-white/80 uppercase tracking-wide mb-6">
          CREATIVE PROJECTS
        </h2>
        
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-indigo-800/30 rounded-xl">
              <span className="text-white font-medium">{project.name}</span>
              <div className="flex items-center space-x-3">
                <span className="text-white/60 text-sm">{project.completed}/{project.total}</span>
                <div className="w-16">
                  <Progress 
                    value={project.total > 0 ? (project.completed / project.total) * 100 : 0} 
                    className="h-2"
                  />
                </div>
              </div>
            </div>
          ))}
          
          <Button className="w-full flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-white/20 rounded-xl text-white/60 hover:text-white hover:border-white/40 bg-transparent">
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}