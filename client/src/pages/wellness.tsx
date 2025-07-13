import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Heart, Plus, CheckCircle, Circle, Flame, Target, Bell, Calendar } from "lucide-react";

interface Habit {
  id: number;
  title: string;
  description: string;
  category: 'meditation' | 'exercise' | 'mindfulness' | 'creativity' | 'nutrition';
  frequency: 'daily' | 'weekly' | 'custom';
  targetDays: number;
  completedDays: number;
  streak: number;
  lastCompleted?: string;
  reminderTime?: string;
}

interface Routine {
  id: number;
  title: string;
  duration: number;
  activities: string[];
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'anytime';
}

export default function Wellness() {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: 1,
      title: "Meditación Matutina",
      description: "10 minutos de meditación mindfulness",
      category: 'meditation',
      frequency: 'daily',
      targetDays: 30,
      completedDays: 12,
      streak: 3,
      lastCompleted: '2024-01-12',
      reminderTime: '07:00'
    },
    {
      id: 2,
      title: "Caminata en la Naturaleza",
      description: "30 minutos al aire libre",
      category: 'exercise',
      frequency: 'daily',
      targetDays: 21,
      completedDays: 8,
      streak: 2,
      reminderTime: '17:00'
    },
    {
      id: 3,
      title: "Escritura Reflexiva",
      description: "Journaling de 15 minutos",
      category: 'mindfulness',
      frequency: 'daily',
      targetDays: 14,
      completedDays: 5,
      streak: 1,
      reminderTime: '21:00'
    }
  ]);

  const [routines] = useState<Routine[]>([
    {
      id: 1,
      title: "Despertar Consciente",
      duration: 20,
      activities: ["Respiración profunda", "Estiramiento suave", "Intención del día"],
      timeOfDay: 'morning'
    },
    {
      id: 2,
      title: "Pausa Regenerativa",
      duration: 15,
      activities: ["Meditación corta", "Hidratación", "Movimiento corporal"],
      timeOfDay: 'afternoon'
    },
    {
      id: 3,
      title: "Cierre del Día",
      duration: 25,
      activities: ["Reflexión escrita", "Gratitud", "Relajación muscular"],
      timeOfDay: 'evening'
    }
  ]);

  const [newHabit, setNewHabit] = useState({
    title: '',
    description: '',
    category: 'mindfulness' as const,
    frequency: 'daily' as const,
    targetDays: 21
  });
  const [showNewHabit, setShowNewHabit] = useState(false);

  const addHabit = () => {
    if (newHabit.title.trim()) {
      const habit: Habit = {
        id: Date.now(),
        ...newHabit,
        completedDays: 0,
        streak: 0
      };
      setHabits([...habits, habit]);
      setNewHabit({
        title: '',
        description: '',
        category: 'mindfulness',
        frequency: 'daily',
        targetDays: 21
      });
      setShowNewHabit(false);
    }
  };

  const toggleHabit = (habitId: number) => {
    const today = new Date().toISOString().split('T')[0];
    setHabits(habits.map(habit => 
      habit.id === habitId 
        ? {
            ...habit,
            completedDays: habit.lastCompleted === today ? habit.completedDays - 1 : habit.completedDays + 1,
            streak: habit.lastCompleted === today ? Math.max(0, habit.streak - 1) : habit.streak + 1,
            lastCompleted: habit.lastCompleted === today ? undefined : today
          }
        : habit
    ));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'meditation': return 'bg-purple-500/20 text-purple-300';
      case 'exercise': return 'bg-green-500/20 text-green-300';
      case 'mindfulness': return 'bg-blue-500/20 text-blue-300';
      case 'creativity': return 'bg-orange-500/20 text-orange-300';
      case 'nutrition': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getTimeOfDayIcon = (timeOfDay: string) => {
    switch (timeOfDay) {
      case 'morning': return '🌅';
      case 'afternoon': return '☀️';
      case 'evening': return '🌙';
      default: return '⏰';
    }
  };

  const isCompletedToday = (habit: Habit) => {
    const today = new Date().toISOString().split('T')[0];
    return habit.lastCompleted === today;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 p-4 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Heart className="text-pink-400" />
              Rituales de Bienestar
            </h1>
            <p className="text-gray-300 mt-1">
              Cultiva hábitos que nutren tu mente, cuerpo y espíritu
            </p>
          </div>
          
          <Dialog open={showNewHabit} onOpenChange={setShowNewHabit}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Hábito
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-white">Crear Nuevo Hábito</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Nombre del hábito"
                  value={newHabit.title}
                  onChange={(e) => setNewHabit({...newHabit, title: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
                <Input
                  placeholder="Descripción"
                  value={newHabit.description}
                  onChange={(e) => setNewHabit({...newHabit, description: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
                <Select value={newHabit.category} onValueChange={(value: any) => setNewHabit({...newHabit, category: value})}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="meditation">Meditación</SelectItem>
                    <SelectItem value="exercise">Ejercicio</SelectItem>
                    <SelectItem value="mindfulness">Mindfulness</SelectItem>
                    <SelectItem value="creativity">Creatividad</SelectItem>
                    <SelectItem value="nutrition">Nutrición</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={addHabit} className="w-full bg-pink-600 hover:bg-pink-700">
                  Crear Hábito
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Today's Habits */}
        <Card className="mb-6 bg-gray-900/50 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="text-cyan-400" />
              Hábitos de Hoy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {habits.map((habit) => (
                <div 
                  key={habit.id}
                  className="flex items-center gap-3 p-4 rounded-lg bg-gray-800/50 border border-gray-700"
                >
                  <button 
                    onClick={() => toggleHabit(habit.id)}
                    className="flex-shrink-0"
                  >
                    {isCompletedToday(habit) ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400 hover:text-green-400 transition-colors" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-medium text-sm ${isCompletedToday(habit) ? 'text-green-400 line-through' : 'text-white'}`}>
                        {habit.title}
                      </h3>
                      <Badge className={getCategoryColor(habit.category)}>
                        {habit.category}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-xs">{habit.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1">
                        <Flame className="w-3 h-3 text-orange-400" />
                        <span className="text-orange-400 text-xs">{habit.streak} días</span>
                      </div>
                      {habit.reminderTime && (
                        <div className="flex items-center gap-1">
                          <Bell className="w-3 h-3 text-blue-400" />
                          <span className="text-blue-400 text-xs">{habit.reminderTime}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Habits Progress */}
        <Card className="mb-6 bg-gray-900/50 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Progreso de Hábitos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {habits.map((habit) => (
                <div key={habit.id} className="p-4 rounded-lg bg-gray-800/50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">{habit.title}</h3>
                    <span className="text-gray-400 text-sm">
                      {habit.completedDays}/{habit.targetDays} días
                    </span>
                  </div>
                  <Progress 
                    value={(habit.completedDays / habit.targetDays) * 100} 
                    className="h-2 bg-gray-700"
                  />
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                    <span>Racha actual: {habit.streak} días</span>
                    <span>{Math.round((habit.completedDays / habit.targetDays) * 100)}% completado</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Wellness Routines */}
        <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="text-purple-400" />
              Rutinas de Bienestar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {routines.map((routine) => (
                <div key={routine.id} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{getTimeOfDayIcon(routine.timeOfDay)}</span>
                    <div>
                      <h3 className="text-white font-medium">{routine.title}</h3>
                      <p className="text-gray-400 text-sm">{routine.duration} minutos</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {routine.activities.map((activity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Circle className="w-2 h-2 text-cyan-400 fill-current" />
                        <span className="text-gray-300 text-sm">{activity}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full mt-4 bg-purple-600 hover:bg-purple-700"
                    size="sm"
                  >
                    Iniciar Rutina
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Daily Inspiration */}
        <Card className="mt-6 bg-gradient-to-r from-pink-900/50 to-purple-900/50 border-pink-700">
          <CardHeader>
            <CardTitle className="text-white">💫 Inspiración para el Bienestar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-pink-400 font-semibold mb-2">🧘 Reflexión del Día</h3>
                <p className="text-gray-300 text-sm">
                  "Cada momento es una nueva oportunidad para elegir el bienestar. Respira profundo y conecta con tu paz interior."
                </p>
              </div>
              <div>
                <h3 className="text-purple-400 font-semibold mb-2">💡 Consejo de Autocuidado</h3>
                <p className="text-gray-300 text-sm">
                  "Programa 5 minutos entre actividades para respirar conscientemente. Estos pequeños momentos transforman todo el día."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}