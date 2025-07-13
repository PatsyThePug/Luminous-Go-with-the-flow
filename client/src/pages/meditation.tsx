import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, RotateCcw, Timer, Wind, Heart, Brain, Moon, Sun, Volume2 } from "lucide-react";

interface MeditationSession {
  id: number;
  title: string;
  description: string;
  duration: number; // minutes
  category: 'mindfulness' | 'breathing' | 'sleep' | 'focus' | 'anxiety' | 'gratitude';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructor: string;
  isCompleted: boolean;
}

interface BreathingExercise {
  id: number;
  name: string;
  description: string;
  pattern: {
    inhale: number;
    hold: number;
    exhale: number;
    pause: number;
  };
  duration: number; // minutes
  benefits: string[];
}

interface MeditationTimer {
  duration: number;
  currentTime: number;
  isRunning: boolean;
  selectedSound: string;
}

export default function Meditation() {
  const [meditationSessions] = useState<MeditationSession[]>([
    {
      id: 1,
      title: "Introducción al Mindfulness",
      description: "Una guía suave para principiantes que explora los fundamentos de la atención plena",
      duration: 10,
      category: 'mindfulness',
      difficulty: 'beginner',
      instructor: "Ana Martín",
      isCompleted: false
    },
    {
      id: 2,
      title: "Respiración Consciente",
      description: "Aprende técnicas de respiración profunda para calmar la mente y el cuerpo",
      duration: 15,
      category: 'breathing',
      difficulty: 'beginner',
      instructor: "Carlos Ruiz",
      isCompleted: true
    },
    {
      id: 3,
      title: "Meditación para el Sueño",
      description: "Una sesión relajante diseñada para preparar tu mente para un descanso profundo",
      duration: 20,
      category: 'sleep',
      difficulty: 'beginner',
      instructor: "Laura González",
      isCompleted: false
    },
    {
      id: 4,
      title: "Enfoque y Concentración",
      description: "Desarrolla tu capacidad de concentración con técnicas de atención dirigida",
      duration: 12,
      category: 'focus',
      difficulty: 'intermediate',
      instructor: "Miguel Torres",
      isCompleted: false
    },
    {
      id: 5,
      title: "Calma para la Ansiedad",
      description: "Técnicas específicas para manejar momentos de ansiedad y estrés",
      duration: 18,
      category: 'anxiety',
      difficulty: 'intermediate',
      instructor: "Sofia López",
      isCompleted: false
    },
    {
      id: 6,
      title: "Gratitud y Aprecio",
      description: "Cultiva sentimientos de gratitud y aprecio hacia la vida",
      duration: 14,
      category: 'gratitude',
      difficulty: 'beginner',
      instructor: "David Chen",
      isCompleted: false
    }
  ]);

  const [breathingExercises] = useState<BreathingExercise[]>([
    {
      id: 1,
      name: "Respiración 4-7-8",
      description: "Técnica calmante que ayuda a reducir el estrés y promover la relajación",
      pattern: { inhale: 4, hold: 7, exhale: 8, pause: 0 },
      duration: 5,
      benefits: ["Reduce ansiedad", "Mejora el sueño", "Calma el sistema nervioso"]
    },
    {
      id: 2,
      name: "Respiración Cuadrada",
      description: "Patrón equilibrado que ayuda a centrar la mente y mejorar la concentración",
      pattern: { inhale: 4, hold: 4, exhale: 4, pause: 4 },
      duration: 8,
      benefits: ["Mejora concentración", "Equilibra energía", "Reduce estrés"]
    },
    {
      id: 3,
      name: "Respiración Triangular",
      description: "Técnica energizante que ayuda a despertar la mente y aumentar la vitalidad",
      pattern: { inhale: 3, hold: 3, exhale: 3, pause: 0 },
      duration: 6,
      benefits: ["Aumenta energía", "Mejora claridad mental", "Estimula vitalidad"]
    }
  ]);

  const [timer, setTimer] = useState<MeditationTimer>({
    duration: 10,
    currentTime: 0,
    isRunning: false,
    selectedSound: 'nature'
  });

  const [activeBreathing, setActiveBreathing] = useState<BreathingExercise | null>(null);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');

  const startTimer = () => {
    setTimer(prev => ({ ...prev, isRunning: true }));
    // Aquí iría la lógica del timer real
  };

  const pauseTimer = () => {
    setTimer(prev => ({ ...prev, isRunning: false }));
  };

  const resetTimer = () => {
    setTimer(prev => ({ ...prev, currentTime: 0, isRunning: false }));
  };

  const startBreathingExercise = (exercise: BreathingExercise) => {
    setActiveBreathing(exercise);
    setBreathingPhase('inhale');
    // Aquí iría la lógica del ejercicio de respiración
  };

  const stopBreathingExercise = () => {
    setActiveBreathing(null);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'mindfulness': return 'bg-blue-500/20 text-blue-300';
      case 'breathing': return 'bg-green-500/20 text-green-300';
      case 'sleep': return 'bg-purple-500/20 text-purple-300';
      case 'focus': return 'bg-orange-500/20 text-orange-300';
      case 'anxiety': return 'bg-red-500/20 text-red-300';
      case 'gratitude': return 'bg-yellow-500/20 text-yellow-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-300';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-300';
      case 'advanced': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'mindfulness': return <Brain className="w-4 h-4" />;
      case 'breathing': return <Wind className="w-4 h-4" />;
      case 'sleep': return <Moon className="w-4 h-4" />;
      case 'focus': return <Sun className="w-4 h-4" />;
      case 'anxiety': return <Heart className="w-4 h-4" />;
      case 'gratitude': return <Heart className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getBreathingInstruction = () => {
    if (!activeBreathing) return '';
    
    switch (breathingPhase) {
      case 'inhale': return 'Inhala profundamente';
      case 'hold': return 'Mantén la respiración';
      case 'exhale': return 'Exhala lentamente';
      case 'pause': return 'Pausa natural';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 p-4 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Brain className="text-indigo-400" />
            Meditación & Mindfulness
          </h1>
          <p className="text-gray-300 mt-1">
            Encuentra paz interior y claridad mental con nuestras herramientas de meditación
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-4 text-center">
              <Timer className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">127</p>
              <p className="text-gray-400 text-sm">Minutos totales</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-4 text-center">
              <Play className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">12</p>
              <p className="text-gray-400 text-sm">Sesiones</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-4 text-center">
              <Wind className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">8</p>
              <p className="text-gray-400 text-sm">Días consecutivos</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-4 text-center">
              <Heart className="w-6 h-6 text-pink-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">95%</p>
              <p className="text-gray-400 text-sm">Nivel de calma</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="sessions" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                <TabsTrigger value="sessions">Sesiones Guiadas</TabsTrigger>
                <TabsTrigger value="breathing">Respiración</TabsTrigger>
                <TabsTrigger value="timer">Timer Libre</TabsTrigger>
              </TabsList>
              
              <TabsContent value="sessions" className="space-y-4 mt-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {meditationSessions.map((session) => (
                    <Card key={session.id} className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-white flex items-center gap-2">
                              {getCategoryIcon(session.category)}
                              {session.title}
                            </CardTitle>
                            <p className="text-gray-400 text-sm mt-1">{session.description}</p>
                          </div>
                          {session.isCompleted && (
                            <Badge className="bg-green-500/20 text-green-300">
                              ✓ Completado
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Badge className={getCategoryColor(session.category)}>
                              {session.category}
                            </Badge>
                            <Badge className={getDifficultyColor(session.difficulty)}>
                              {session.difficulty}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <span>⏱️ {session.duration} minutos</span>
                            <span>👤 {session.instructor}</span>
                          </div>
                          
                          <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                            <Play className="w-4 h-4 mr-2" />
                            {session.isCompleted ? 'Reproducir Nuevamente' : 'Iniciar Sesión'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="breathing" className="mt-4">
                {activeBreathing ? (
                  <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white text-center">
                        {activeBreathing.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center space-y-6">
                        {/* Breathing Circle Animation */}
                        <div className="relative mx-auto w-48 h-48 rounded-full border-4 border-cyan-400/30 flex items-center justify-center">
                          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-400/20 flex items-center justify-center">
                            <Wind className="w-12 h-12 text-cyan-400" />
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <h3 className="text-2xl text-white font-medium">
                            {getBreathingInstruction()}
                          </h3>
                          <p className="text-gray-400">
                            {breathingPhase}: {activeBreathing.pattern[breathingPhase]} segundos
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-center gap-4">
                          <Button 
                            onClick={stopBreathingExercise}
                            variant="outline"
                            className="border-gray-600 text-gray-300"
                          >
                            Detener
                          </Button>
                          <Button className="bg-cyan-600 hover:bg-cyan-700">
                            <Pause className="w-4 h-4 mr-2" />
                            Pausar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {breathingExercises.map((exercise) => (
                      <Card key={exercise.id} className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="text-white flex items-center gap-2">
                            <Wind className="text-cyan-400" />
                            {exercise.name}
                          </CardTitle>
                          <p className="text-gray-400">{exercise.description}</p>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-white font-medium mb-2">Patrón:</h4>
                                <div className="text-sm text-gray-300">
                                  Inhalar: {exercise.pattern.inhale}s →
                                  {exercise.pattern.hold > 0 && ` Mantener: ${exercise.pattern.hold}s →`}
                                  Exhalar: {exercise.pattern.exhale}s
                                  {exercise.pattern.pause > 0 && ` → Pausa: ${exercise.pattern.pause}s`}
                                </div>
                              </div>
                              <div>
                                <h4 className="text-white font-medium mb-2">Beneficios:</h4>
                                <div className="space-y-1">
                                  {exercise.benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                                      <span className="text-gray-300 text-sm">{benefit}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            <Button 
                              onClick={() => startBreathingExercise(exercise)}
                              className="w-full bg-cyan-600 hover:bg-cyan-700"
                            >
                              <Play className="w-4 h-4 mr-2" />
                              Iniciar Ejercicio ({exercise.duration} min)
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="timer" className="mt-4">
                <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white text-center">Meditación Libre</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-6">
                      {/* Timer Display */}
                      <div className="relative mx-auto w-48 h-48 rounded-full border-4 border-purple-400/30 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl font-mono text-white mb-2">
                            {formatTime(timer.duration * 60 - timer.currentTime)}
                          </div>
                          <div className="text-gray-400 text-sm">
                            {timer.duration} min total
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress */}
                      <div className="space-y-2">
                        <Progress 
                          value={(timer.currentTime / (timer.duration * 60)) * 100} 
                          className="h-2 bg-gray-700"
                        />
                        <p className="text-gray-400 text-sm">
                          {Math.floor((timer.currentTime / (timer.duration * 60)) * 100)}% completado
                        </p>
                      </div>
                      
                      {/* Controls */}
                      <div className="flex items-center justify-center gap-4">
                        <Button 
                          onClick={resetTimer}
                          variant="outline"
                          className="border-gray-600 text-gray-300"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                        
                        <Button 
                          onClick={timer.isRunning ? pauseTimer : startTimer}
                          className="bg-purple-600 hover:bg-purple-700 px-8"
                        >
                          {timer.isRunning ? (
                            <Pause className="w-4 h-4 mr-2" />
                          ) : (
                            <Play className="w-4 h-4 mr-2" />
                          )}
                          {timer.isRunning ? 'Pausar' : 'Iniciar'}
                        </Button>
                        
                        <Button 
                          variant="outline"
                          className="border-gray-600 text-gray-300"
                        >
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      {/* Duration Selection */}
                      <div className="flex items-center justify-center gap-2">
                        {[5, 10, 15, 20, 30].map((duration) => (
                          <Button
                            key={duration}
                            size="sm"
                            variant={timer.duration === duration ? "default" : "outline"}
                            onClick={() => setTimer(prev => ({ ...prev, duration, currentTime: 0 }))}
                            className={timer.duration === duration 
                              ? "bg-purple-600" 
                              : "border-gray-600 text-gray-300"
                            }
                          >
                            {duration}m
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Recommendation */}
            <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-700/50">
              <CardHeader>
                <CardTitle className="text-white">🌟 Recomendación del Día</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h3 className="text-indigo-400 font-semibold">Meditación Matutina</h3>
                  <p className="text-gray-300 text-sm">
                    Comienza tu día con 10 minutos de mindfulness. Ideal para establecer 
                    una intención positiva para el día.
                  </p>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Empezar Ahora
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Mood Check */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">¿Cómo te sientes?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {['😌', '😊', '😔', '😰', '😴', '🧘'].map((emoji, index) => (
                    <button
                      key={index}
                      className="p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors text-2xl"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                <p className="text-gray-400 text-xs mt-3 text-center">
                  Selecciona tu estado actual para recomendaciones personalizadas
                </p>
              </CardContent>
            </Card>

            {/* Weekly Progress */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Progreso Semanal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Sesiones completadas</span>
                    <span className="text-green-400 font-bold">5/7</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Tiempo total</span>
                    <span className="text-blue-400 font-bold">67 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Racha actual</span>
                    <span className="text-purple-400 font-bold">8 días</span>
                  </div>
                  <Progress value={71} className="h-2 bg-gray-700 mt-3" />
                  <p className="text-gray-400 text-xs text-center">
                    71% de tu objetivo semanal
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Sound Settings */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Sonidos Ambientales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { id: 'nature', name: 'Naturaleza', icon: '🌿' },
                    { id: 'rain', name: 'Lluvia', icon: '🌧️' },
                    { id: 'ocean', name: 'Océano', icon: '🌊' },
                    { id: 'silence', name: 'Silencio', icon: '🤫' }
                  ].map((sound) => (
                    <button
                      key={sound.id}
                      className={`w-full p-2 rounded-lg text-left transition-colors ${
                        timer.selectedSound === sound.id 
                          ? 'bg-purple-600/20 border border-purple-500' 
                          : 'bg-gray-800/50 hover:bg-gray-700/50'
                      }`}
                      onClick={() => setTimer(prev => ({ ...prev, selectedSound: sound.id }))}
                    >
                      <span className="text-lg mr-2">{sound.icon}</span>
                      <span className="text-white text-sm">{sound.name}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}