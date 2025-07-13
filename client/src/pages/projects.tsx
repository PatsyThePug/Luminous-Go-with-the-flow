import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Calendar, Image, Link, CheckCircle, Circle, Palette, Lightbulb } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  status: 'planning' | 'in-progress' | 'completed';
  dueDate: string;
  tasks: Task[];
  images: string[];
  links: string[];
  notes: string[];
}

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "Pintura Abstracta",
      description: "Serie de 5 pinturas explorando emociones a través del color",
      status: 'in-progress',
      dueDate: '2024-02-15',
      tasks: [
        { id: 1, title: "Bocetos iniciales", completed: true, priority: 'high' },
        { id: 2, title: "Preparar lienzos", completed: true, priority: 'medium' },
        { id: 3, title: "Primera capa de color", completed: false, priority: 'high' },
        { id: 4, title: "Detalles finales", completed: false, priority: 'low' }
      ],
      images: [],
      links: ["https://inspiration-art.com"],
      notes: ["Usar paleta cálida", "Inspiración: atardecer en la playa"]
    },
    {
      id: 2,
      title: "Blog de Escritura Creativa",
      description: "Publicar un artículo semanal sobre mindfulness y creatividad",
      status: 'planning',
      dueDate: '2024-03-01',
      tasks: [
        { id: 5, title: "Planificar temas", completed: false, priority: 'high' },
        { id: 6, title: "Escribir primer artículo", completed: false, priority: 'medium' }
      ],
      images: [],
      links: [],
      notes: ["Enfoque en experiencias personales"]
    }
  ]);

  const [newProject, setNewProject] = useState({ title: '', description: '' });
  const [showNewProject, setShowNewProject] = useState(false);

  const addProject = () => {
    if (newProject.title.trim()) {
      const project: Project = {
        id: Date.now(),
        title: newProject.title,
        description: newProject.description,
        status: 'planning',
        dueDate: '',
        tasks: [],
        images: [],
        links: [],
        notes: []
      };
      setProjects([...projects, project]);
      setNewProject({ title: '', description: '' });
      setShowNewProject(false);
    }
  };

  const toggleTask = (projectId: number, taskId: number) => {
    setProjects(projects.map(project => 
      project.id === projectId 
        ? {
            ...project,
            tasks: project.tasks.map(task =>
              task.id === taskId ? { ...task, completed: !task.completed } : task
            )
          }
        : project
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-yellow-500/20 text-yellow-300';
      case 'in-progress': return 'bg-blue-500/20 text-blue-300';
      case 'completed': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-300';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'low': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 p-4 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Palette className="text-cyan-400" />
              Proyectos Creativos
            </h1>
            <p className="text-gray-300 mt-1">
              Organiza y da vida a tus ideas creativas
            </p>
          </div>
          
          <Dialog open={showNewProject} onOpenChange={setShowNewProject}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Proyecto
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-white">Crear Nuevo Proyecto</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Título del proyecto"
                  value={newProject.title}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
                <Textarea
                  placeholder="Descripción del proyecto"
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
                <Button onClick={addProject} className="w-full bg-cyan-600 hover:bg-cyan-700">
                  Crear Proyecto
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white text-lg">{project.title}</CardTitle>
                    <p className="text-gray-400 text-sm mt-1">{project.description}</p>
                  </div>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="tasks" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-gray-800">
                    <TabsTrigger value="tasks" className="text-xs">Tareas</TabsTrigger>
                    <TabsTrigger value="notes" className="text-xs">Notas</TabsTrigger>
                    <TabsTrigger value="images" className="text-xs">Imágenes</TabsTrigger>
                    <TabsTrigger value="links" className="text-xs">Enlaces</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="tasks" className="space-y-2 mt-4">
                    {project.tasks.map((task) => (
                      <div 
                        key={task.id}
                        className="flex items-center gap-3 p-2 rounded-lg bg-gray-800/50"
                      >
                        <button onClick={() => toggleTask(project.id, task.id)}>
                          {task.completed ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <Circle className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                        <span className={`flex-1 text-sm ${task.completed ? 'text-gray-500 line-through' : 'text-white'}`}>
                          {task.title}
                        </span>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </div>
                    ))}
                    {project.tasks.length === 0 && (
                      <p className="text-gray-500 text-sm">No hay tareas aún</p>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="notes" className="mt-4">
                    <div className="space-y-2">
                      {project.notes.map((note, index) => (
                        <div key={index} className="p-2 rounded-lg bg-gray-800/50">
                          <p className="text-white text-sm">{note}</p>
                        </div>
                      ))}
                      {project.notes.length === 0 && (
                        <p className="text-gray-500 text-sm">No hay notas aún</p>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="images" className="mt-4">
                    <div className="flex items-center justify-center h-24 border-2 border-dashed border-gray-600 rounded-lg">
                      <div className="text-center">
                        <Image className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                        <p className="text-gray-500 text-xs">Agregar imágenes</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="links" className="mt-4">
                    <div className="space-y-2">
                      {project.links.map((link, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-gray-800/50">
                          <Link className="w-4 h-4 text-cyan-400" />
                          <a href={link} target="_blank" rel="noopener noreferrer" 
                             className="text-cyan-400 text-sm hover:underline">
                            {link}
                          </a>
                        </div>
                      ))}
                      {project.links.length === 0 && (
                        <p className="text-gray-500 text-sm">No hay enlaces aún</p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>

                {project.dueDate && (
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-700">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400 text-sm">
                      Fecha límite: {new Date(project.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Inspiration Section */}
        <Card className="mt-8 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Lightbulb className="text-yellow-400" />
              Inspiración Creativa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-cyan-400 font-semibold mb-2">💡 Idea del Día</h3>
                <p className="text-gray-300 text-sm">
                  "Prueba crear usando solo tres colores hoy. Las limitaciones a menudo liberan la creatividad más profunda."
                </p>
              </div>
              <div>
                <h3 className="text-green-400 font-semibold mb-2">🎨 Técnica Recomendada</h3>
                <p className="text-gray-300 text-sm">
                  "Técnica de collage digital: combina fotografías personales con texturas abstractas para crear narrativas visuales únicas."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}