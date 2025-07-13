import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Target, Calendar, Star, Users, Clock, Award, Zap, CheckCircle, Play } from "lucide-react";

interface Challenge {
  id: number;
  title: string;
  description: string;
  category: 'creative' | 'wellness' | 'mindfulness' | 'mixed';
  type: 'daily' | 'weekly' | 'monthly';
  duration: number; // days
  participants: number;
  reward: string;
  difficulty: 'easy' | 'medium' | 'hard';
  progress?: number; // user progress percentage
  isJoined: boolean;
  daysLeft: number;
  tasks: string[];
}

interface UserAchievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  category: string;
}

export default function Challenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 1,
      title: "30 Días de Creatividad",
      description: "Dedica al menos 30 minutos diarios a una actividad creativa durante un mes completo",
      category: 'creative',
      type: 'monthly',
      duration: 30,
      participants: 1247,
      reward: "Insignia de Creador Consistente + Kit digital de herramientas",
      difficulty: 'medium',
      progress: 40,
      isJoined: true,
      daysLeft: 18,
      tasks: [
        "Crear algo nuevo cada día",
        "Documentar tu proceso",
        "Compartir tu progreso semanalmente",
        "Experimentar con 3 técnicas diferentes"
      ]
    },
    {
      id: 2,
      title: "Meditación Mindful",
      description: "Practica 10 minutos de meditación mindfulness cada mañana durante 21 días",
      category: 'wellness',
      type: 'weekly',
      duration: 21,
      participants: 892,
      reward: "Insignia de Mente Zen + Sesiones de meditación premium",
      difficulty: 'easy',
      progress: 65,
      isJoined: true,
      daysLeft: 7,
      tasks: [
        "10 min de meditación matutina",
        "Registrar tu estado de ánimo",
        "Practicar respiración consciente",
        "Reflexionar sobre tus sensaciones"
      ]
    },
    {
      id: 3,
      title: "Arte Express",
      description: "Crea una obra de arte en menos de 15 minutos, enfocándote en la expresión libre",
      category: 'creative',
      type: 'weekly',
      duration: 7,
      participants: 563,
      reward: "Insignia de Expresión Rápida + Feedback personalizado",
      difficulty: 'easy',
      isJoined: false,
      daysLeft: 5,
      tasks: [
        "Crear arte en 15 min máximo",
        "Usar solo 3 colores",
        "No planificar, solo expresar",
        "Compartir el resultado"
      ]
    },
    {
      id: 4,
      title: "Bienestar 360",
      description: "Combina creatividad, ejercicio y mindfulness en una rutina integral de autocuidado",
      category: 'mixed',
      type: 'monthly',
      duration: 28,
      participants: 734,
      reward: "Insignia de Equilibrio Total + Consulta de bienestar",
      difficulty: 'hard',
      isJoined: false,
      daysLeft: 22,
      tasks: [
        "30 min de actividad creativa",
        "20 min de ejercicio físico",
        "10 min de meditación",
        "Registrar emociones diarias"
      ]
    },
    {
      id: 5,
      title: "Gratitud Creativa",
      description: "Expresa tu gratitud a través de diferentes medios creativos durante una semana",
      category: 'mindfulness',
      type: 'weekly',
      duration: 7,
      participants: 1024,
      reward: "Insignia de Corazón Agradecido + Plantillas de gratitud",
      difficulty: 'easy',
      isJoined: false,
      daysLeft: 3,
      tasks: [
        "Crear una expresión de gratitud diaria",
        "Usar medios diferentes cada día",
        "Compartir con la comunidad",
        "Reflexionar sobre el impacto"
      ]
    }
  ]);

  const [achievements, setAchievements] = useState<UserAchievement[]>([
    {
      id: 1,
      title: "Primer Paso",
      description: "Completaste tu primer desafío",
      icon: "🎯",
      unlockedAt: "2024-01-10",
      category: "Iniciación"
    },
    {
      id: 2,
      title: "Racha de Fuego",
      description: "Mantuviste una racha de 7 días consecutivos",
      icon: "🔥",
      unlockedAt: "2024-01-15",
      category: "Consistencia"
    },
    {
      id: 3,
      title: "Creador Comunitario",
      description: "Compartiste tu progreso 10 veces",
      icon: "🤝",
      unlockedAt: "2024-01-20",
      category: "Comunidad"
    }
  ]);

  const joinChallenge = (challengeId: number) => {
    setChallenges(challenges.map(challenge =>
      challenge.id === challengeId 
        ? { ...challenge, isJoined: true, participants: challenge.participants + 1, progress: 0 }
        : challenge
    ));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'creative': return 'bg-purple-500/20 text-purple-300';
      case 'wellness': return 'bg-green-500/20 text-green-300';
      case 'mindfulness': return 'bg-blue-500/20 text-blue-300';
      case 'mixed': return 'bg-gradient-to-r from-purple-500/20 to-green-500/20 text-yellow-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-300';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'hard': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'daily': return <Zap className="w-4 h-4" />;
      case 'weekly': return <Calendar className="w-4 h-4" />;
      case 'monthly': return <Target className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 p-4 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Trophy className="text-yellow-400" />
            Desafíos y Recompensas
          </h1>
          <p className="text-gray-300 mt-1">
            Supérate cada día con desafíos que nutren tu creatividad y bienestar
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-4 text-center">
              <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">
                {challenges.filter(c => c.isJoined && c.progress === 100).length}
              </p>
              <p className="text-gray-400 text-sm">Completados</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-4 text-center">
              <Play className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">
                {challenges.filter(c => c.isJoined && c.progress < 100).length}
              </p>
              <p className="text-gray-400 text-sm">Activos</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-4 text-center">
              <Star className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{achievements.length}</p>
              <p className="text-gray-400 text-sm">Logros</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">
                {challenges.filter(c => c.isJoined).reduce((sum, c) => sum + c.participants, 0)}
              </p>
              <p className="text-gray-400 text-sm">Conexiones</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                <TabsTrigger value="active">Mis Desafíos</TabsTrigger>
                <TabsTrigger value="available">Disponibles</TabsTrigger>
                <TabsTrigger value="completed">Completados</TabsTrigger>
              </TabsList>
              
              <TabsContent value="active" className="space-y-4 mt-4">
                {challenges.filter(c => c.isJoined && c.progress < 100).map((challenge) => (
                  <Card key={challenge.id} className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-white flex items-center gap-2">
                            {getTypeIcon(challenge.type)}
                            {challenge.title}
                          </CardTitle>
                          <p className="text-gray-400 mt-1">{challenge.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getCategoryColor(challenge.category)}>
                            {challenge.category}
                          </Badge>
                          <Badge className={getDifficultyColor(challenge.difficulty)}>
                            {challenge.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white font-medium">Progreso</span>
                            <span className="text-gray-400 text-sm">{challenge.progress}%</span>
                          </div>
                          <Progress value={challenge.progress} className="h-2 bg-gray-700" />
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h4 className="text-white font-medium">Tareas:</h4>
                            {challenge.tasks.map((task, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-gray-300 text-sm">{task}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-cyan-400" />
                              <span className="text-gray-300 text-sm">{challenge.daysLeft} días restantes</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-purple-400" />
                              <span className="text-gray-300 text-sm">{challenge.participants} participantes</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-yellow-400" />
                              <span className="text-gray-300 text-sm">{challenge.reward}</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          Registrar Progreso Hoy
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {challenges.filter(c => c.isJoined && c.progress < 100).length === 0 && (
                  <Card className="bg-gray-900/50 border-gray-700">
                    <CardContent className="text-center py-8">
                      <Target className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400">No tienes desafíos activos</p>
                      <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
                        Explorar Desafíos
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="available" className="space-y-4 mt-4">
                {challenges.filter(c => !c.isJoined).map((challenge) => (
                  <Card key={challenge.id} className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-white flex items-center gap-2">
                            {getTypeIcon(challenge.type)}
                            {challenge.title}
                          </CardTitle>
                          <p className="text-gray-400 mt-1">{challenge.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getCategoryColor(challenge.category)}>
                            {challenge.category}
                          </Badge>
                          <Badge className={getDifficultyColor(challenge.difficulty)}>
                            {challenge.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h4 className="text-white font-medium">Lo que harás:</h4>
                            {challenge.tasks.slice(0, 3).map((task, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                                <span className="text-gray-300 text-sm">{task}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-cyan-400" />
                              <span className="text-gray-300 text-sm">{challenge.duration} días</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-purple-400" />
                              <span className="text-gray-300 text-sm">{challenge.participants} participantes</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-yellow-400" />
                              <span className="text-gray-300 text-sm">{challenge.reward}</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={() => joinChallenge(challenge.id)}
                          className="w-full bg-purple-600 hover:bg-purple-700"
                        >
                          Unirse al Desafío
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="completed" className="mt-4">
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardContent className="text-center py-8">
                    <Trophy className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">Aún no has completado ningún desafío</p>
                    <p className="text-gray-500 text-sm mt-2">
                      ¡Termina tu primer desafío para ver tus logros aquí!
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Star className="text-yellow-400" />
                  Tus Logros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <h4 className="text-white font-medium text-sm">{achievement.title}</h4>
                        <p className="text-gray-400 text-xs">{achievement.description}</p>
                        <p className="text-gray-500 text-xs">{achievement.unlockedAt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Challenge Spotlight */}
            <Card className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border-yellow-700">
              <CardHeader>
                <CardTitle className="text-white">🌟 Desafío Destacado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h3 className="text-yellow-400 font-semibold">Gratitud Creativa</h3>
                  <p className="text-gray-300 text-sm">
                    El desafío más popular esta semana. Únete a más de 1000 participantes.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Users className="w-3 h-3" />
                    <span>1,024 participantes</span>
                  </div>
                  <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                    Ver Detalles
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Progress Summary */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Resumen Semanal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Días activos</span>
                    <span className="text-green-400 font-bold">5/7</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Tareas completadas</span>
                    <span className="text-blue-400 font-bold">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Racha actual</span>
                    <span className="text-orange-400 font-bold">3 días</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}