import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MessageSquare, Heart, Share2, Plus, TrendingUp, Award, Calendar } from "lucide-react";

interface Post {
  id: number;
  author: string;
  content: string;
  category: 'progress' | 'inspiration' | 'question' | 'achievement';
  likes: number;
  comments: number;
  timeAgo: string;
  image?: string;
}

interface Group {
  id: number;
  name: string;
  description: string;
  members: number;
  category: 'art' | 'wellness' | 'writing' | 'music' | 'general';
  isJoined: boolean;
}

export default function Community() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "María García",
      content: "¡Completé mi primera semana de meditación diaria! 🧘‍♀️ Ha sido increíble notar cómo mi nivel de estrés ha disminuido. ¿Alguien más está siguiendo una rutina similar?",
      category: 'progress',
      likes: 12,
      comments: 5,
      timeAgo: "hace 2 horas"
    },
    {
      id: 2,
      author: "Carlos Rivera",
      content: "Terminé mi primera pintura abstracta después de meses de bloqueo creativo. A veces solo necesitas empezar sin expectativas. Aquí está el resultado 🎨",
      category: 'achievement',
      likes: 28,
      comments: 8,
      timeAgo: "hace 4 horas"
    },
    {
      id: 3,
      author: "Ana López",
      content: "¿Qué técnicas usan para mantener la consistencia en sus proyectos creativos? Llevo dos semanas trabajando en mi novela pero algunos días me falta motivación.",
      category: 'question',
      likes: 7,
      comments: 12,
      timeAgo: "hace 6 horas"
    },
    {
      id: 4,
      author: "David Chen",
      content: "Reflexión del día: 'La creatividad no es un talento, es una forma de operar.' - John Cleese. Esta cita me ha ayudado a entender que la creatividad es práctica diaria.",
      category: 'inspiration',
      likes: 15,
      comments: 3,
      timeAgo: "hace 8 horas"
    }
  ]);

  const [groups, setGroups] = useState<Group[]>([
    {
      id: 1,
      name: "Artistas Digitales",
      description: "Espacio para compartir y aprender sobre arte digital, ilustración y diseño",
      members: 342,
      category: 'art',
      isJoined: true
    },
    {
      id: 2,
      name: "Mindfulness Diario",
      description: "Comunidad dedicada a la práctica diaria de mindfulness y meditación",
      members: 567,
      category: 'wellness',
      isJoined: true
    },
    {
      id: 3,
      name: "Escritores Creativos",
      description: "Para quienes aman contar historias y explorar la escritura creativa",
      members: 234,
      category: 'writing',
      isJoined: false
    },
    {
      id: 4,
      name: "Músicos Independientes",
      description: "Colaboración y apoyo para músicos que crean de forma independiente",
      members: 189,
      category: 'music',
      isJoined: false
    }
  ]);

  const [newPost, setNewPost] = useState({ content: '', category: 'progress' as const });
  const [showNewPost, setShowNewPost] = useState(false);

  const addPost = () => {
    if (newPost.content.trim()) {
      const post: Post = {
        id: Date.now(),
        author: "Tú",
        content: newPost.content,
        category: newPost.category,
        likes: 0,
        comments: 0,
        timeAgo: "ahora"
      };
      setPosts([post, ...posts]);
      setNewPost({ content: '', category: 'progress' });
      setShowNewPost(false);
    }
  };

  const toggleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const toggleGroup = (groupId: number) => {
    setGroups(groups.map(group =>
      group.id === groupId 
        ? { ...group, isJoined: !group.isJoined, members: group.isJoined ? group.members - 1 : group.members + 1 }
        : group
    ));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'progress': return 'bg-blue-500/20 text-blue-300';
      case 'achievement': return 'bg-green-500/20 text-green-300';
      case 'question': return 'bg-yellow-500/20 text-yellow-300';
      case 'inspiration': return 'bg-purple-500/20 text-purple-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getGroupCategoryIcon = (category: string) => {
    switch (category) {
      case 'art': return '🎨';
      case 'wellness': return '🧘';
      case 'writing': return '✍️';
      case 'music': return '🎵';
      default: return '💬';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 p-4 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Users className="text-blue-400" />
              Comunidad y Conexión
            </h1>
            <p className="text-gray-300 mt-1">
              Comparte tu progreso y conecta con otros creativos
            </p>
          </div>
          
          <Dialog open={showNewPost} onOpenChange={setShowNewPost}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                <Plus className="w-4 h-4 mr-2" />
                Nueva Publicación
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-white">Compartir con la Comunidad</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Textarea
                  placeholder="¿Qué quieres compartir con la comunidad?"
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white min-h-[100px]"
                />
                <div className="flex gap-2">
                  {(['progress', 'achievement', 'question', 'inspiration'] as const).map((category) => (
                    <Badge
                      key={category}
                      className={`cursor-pointer ${newPost.category === category ? getCategoryColor(category) : 'bg-gray-700 text-gray-300'}`}
                      onClick={() => setNewPost({...newPost, category})}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
                <Button onClick={addPost} className="w-full bg-blue-600 hover:bg-blue-700">
                  Publicar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-4">
            <Tabs defaultValue="feed" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                <TabsTrigger value="feed">Feed Principal</TabsTrigger>
                <TabsTrigger value="trending">Tendencias</TabsTrigger>
                <TabsTrigger value="following">Siguiendo</TabsTrigger>
              </TabsList>
              
              <TabsContent value="feed" className="space-y-4 mt-4">
                {posts.map((post) => (
                  <Card key={post.id} className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-cyan-600 text-white">
                              {post.author.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-white font-medium">{post.author}</h3>
                            <p className="text-gray-400 text-sm">{post.timeAgo}</p>
                          </div>
                        </div>
                        <Badge className={getCategoryColor(post.category)}>
                          {post.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4">{post.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => toggleLike(post.id)}
                            className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors"
                          >
                            <Heart className="w-5 h-5" />
                            <span className="text-sm">{post.likes}</span>
                          </button>
                          <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                            <MessageSquare className="w-5 h-5" />
                            <span className="text-sm">{post.comments}</span>
                          </button>
                          <button className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors">
                            <Share2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="trending" className="mt-4">
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <TrendingUp className="text-orange-400" />
                      Contenido Popular
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-gray-800/50">
                        <p className="text-white font-medium">#MeditaciónMatutina</p>
                        <p className="text-gray-400 text-sm">152 publicaciones esta semana</p>
                      </div>
                      <div className="p-3 rounded-lg bg-gray-800/50">
                        <p className="text-white font-medium">#ArteAbstracto</p>
                        <p className="text-gray-400 text-sm">89 publicaciones esta semana</p>
                      </div>
                      <div className="p-3 rounded-lg bg-gray-800/50">
                        <p className="text-white font-medium">#EscrituraCreativa</p>
                        <p className="text-gray-400 text-sm">67 publicaciones esta semana</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="following" className="mt-4">
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardContent className="pt-6">
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400">Aún no sigues a nadie</p>
                      <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                        Explorar Usuarios
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Estadísticas de Comunidad</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Miembros activos</span>
                    <span className="text-cyan-400 font-bold">2,847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Publicaciones hoy</span>
                    <span className="text-green-400 font-bold">156</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Proyectos compartidos</span>
                    <span className="text-purple-400 font-bold">89</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Groups */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Grupos Sugeridos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {groups.map((group) => (
                    <div key={group.id} className="p-3 rounded-lg bg-gray-800/50 border border-gray-700">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{getGroupCategoryIcon(group.category)}</span>
                          <div>
                            <h3 className="text-white font-medium text-sm">{group.name}</h3>
                            <p className="text-gray-400 text-xs">{group.members} miembros</p>
                          </div>
                        </div>
                        <Button 
                          size="sm"
                          variant={group.isJoined ? "outline" : "default"}
                          onClick={() => toggleGroup(group.id)}
                          className={group.isJoined ? "border-gray-600 text-gray-300" : "bg-blue-600 hover:bg-blue-700"}
                        >
                          {group.isJoined ? "Unirse" : "Unido"}
                        </Button>
                      </div>
                      <p className="text-gray-400 text-xs">{group.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Challenge */}
            <Card className="bg-gradient-to-r from-orange-900/50 to-red-900/50 border-orange-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className="text-yellow-400" />
                  Desafío Semanal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h3 className="text-orange-400 font-semibold">🎨 Arte en 15 Minutos</h3>
                  <p className="text-gray-300 text-sm">
                    Crea una obra de arte usando solo 15 minutos. ¡Comparte tu proceso y resultado!
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />
                    <span>Termina en 3 días</span>
                  </div>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    Participar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}