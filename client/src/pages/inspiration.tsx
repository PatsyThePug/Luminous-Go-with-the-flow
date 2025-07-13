import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Quote, Lightbulb, Image, Play, Heart, Share2, BookOpen, Camera, Palette } from "lucide-react";

interface Quote {
  id: number;
  content: string;
  author: string;
  category: 'creativity' | 'mindfulness' | 'motivation' | 'wisdom';
}

interface Inspiration {
  id: number;
  title: string;
  content: string;
  type: 'tip' | 'technique' | 'exercise' | 'idea';
  category: 'creative' | 'wellness' | 'productivity';
  difficulty: 'easy' | 'medium' | 'advanced';
  timeToRead: number; // minutes
}

interface CreativePrompt {
  id: number;
  title: string;
  description: string;
  medium: 'writing' | 'visual' | 'music' | 'mixed';
  timeLimit: number; // minutes
  isCompleted: boolean;
}

export default function Inspiration() {
  const [dailyQuote] = useState<Quote>({
    id: 1,
    content: "La creatividad es la inteligencia divirtiéndose.",
    author: "Albert Einstein",
    category: 'creativity'
  });

  const [inspirations] = useState<Inspiration[]>([
    {
      id: 1,
      title: "Técnica de los 5 Sentidos",
      content: "Cuando te sientes bloqueado creativamente, describe tu proyecto usando los 5 sentidos. ¿Cómo se ve, suena, huele, siente y sabe? Esta técnica activa diferentes áreas del cerebro y puede desbloquear nuevas perspectivas.",
      type: 'technique',
      category: 'creative',
      difficulty: 'easy',
      timeToRead: 2
    },
    {
      id: 2,
      title: "Pausa Regenerativa de 3 Minutos",
      content: "Cuando sientes tensión mientras trabajas: 1) Cierra los ojos, 2) Respira profundo 3 veces, 3) Visualiza un lugar que te calme, 4) Mueve suavemente cuello y hombros. Esta micro-pausa restaura tu energía creativa.",
      type: 'exercise',
      category: 'wellness',
      difficulty: 'easy',
      timeToRead: 1
    },
    {
      id: 3,
      title: "Método de Asociación Libre",
      content: "Escribe la primera palabra que se te ocurra. Luego escribe la primera palabra que esa palabra te inspire. Continúa por 10 palabras. Usa la última palabra como punto de partida para tu próximo proyecto creativo.",
      type: 'technique',
      category: 'creative',
      difficulty: 'medium',
      timeToRead: 3
    },
    {
      id: 4,
      title: "Organización del Espacio Creativo",
      content: "Tu entorno físico influye directamente en tu creatividad. Dedica 15 minutos a reorganizar tu espacio de trabajo: elimina distracciones, añade algo que te inspire (planta, arte, foto) y asegúrate de que la iluminación sea la adecuada.",
      type: 'tip',
      category: 'productivity',
      difficulty: 'easy',
      timeToRead: 2
    },
    {
      id: 5,
      title: "Escritura Automática",
      content: "Durante 10 minutos, escribe sin parar sobre cualquier tema que te venga a la mente. No corrijas, no edites, solo escribe. Este ejercicio libera bloqueos mentales y a menudo revela ideas sorprendentes que tu mente consciente estaba ocultando.",
      type: 'exercise',
      category: 'creative',
      difficulty: 'medium',
      timeToRead: 4
    },
    {
      id: 6,
      title: "Técnica Pomodoro Creativa",
      content: "Trabaja en tu proyecto por 25 minutos con total concentración, luego toma 5 minutos para hacer algo completamente diferente (caminar, estirar, respirar). Esta alternancia mantiene tu mente fresca y productiva durante horas.",
      type: 'technique',
      category: 'productivity',
      difficulty: 'easy',
      timeToRead: 2
    }
  ]);

  const [creativePrompts, setCreativePrompts] = useState<CreativePrompt[]>([
    {
      id: 1,
      title: "Autorretrato Emocional",
      description: "Crea un autorretrato que refleje cómo te sientes hoy, pero sin usar tu rostro. Usa formas, colores, texturas o símbolos para expresar tu estado emocional actual.",
      medium: 'visual',
      timeLimit: 20,
      isCompleted: false
    },
    {
      id: 2,
      title: "Historia en 6 Palabras",
      description: "Cuenta una historia completa usando exactamente 6 palabras. Hemingway escribió: 'For sale: baby shoes, never worn.' ¿Cuál será tu historia de 6 palabras?",
      medium: 'writing',
      timeLimit: 10,
      isCompleted: false
    },
    {
      id: 3,
      title: "Melodía de tu Día",
      description: "Compone o tararea una melodía que represente cómo ha sido tu día. No importa si no sabes música formal, usa tu voz o cualquier objeto que produzca sonido.",
      medium: 'music',
      timeLimit: 15,
      isCompleted: false
    },
    {
      id: 4,
      title: "Collage de Gratitud",
      description: "Usando materiales que tengas a mano (revistas, fotos, dibujos), crea un collage que represente 3 cosas por las que estás agradecido hoy.",
      medium: 'mixed',
      timeLimit: 25,
      isCompleted: false
    }
  ]);

  const [likedContent, setLikedContent] = useState<number[]>([]);

  const toggleLike = (contentId: number) => {
    setLikedContent(prev => 
      prev.includes(contentId) 
        ? prev.filter(id => id !== contentId)
        : [...prev, contentId]
    );
  };

  const completePrompt = (promptId: number) => {
    setCreativePrompts(prompts => 
      prompts.map(prompt => 
        prompt.id === promptId ? { ...prompt, isCompleted: true } : prompt
      )
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'creative': return 'bg-purple-500/20 text-purple-300';
      case 'wellness': return 'bg-green-500/20 text-green-300';
      case 'productivity': return 'bg-blue-500/20 text-blue-300';
      case 'creativity': return 'bg-orange-500/20 text-orange-300';
      case 'mindfulness': return 'bg-cyan-500/20 text-cyan-300';
      case 'motivation': return 'bg-red-500/20 text-red-300';
      case 'wisdom': return 'bg-yellow-500/20 text-yellow-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tip': return <Lightbulb className="w-4 h-4" />;
      case 'technique': return <BookOpen className="w-4 h-4" />;
      case 'exercise': return <Play className="w-4 h-4" />;
      case 'idea': return <Sparkles className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getMediumIcon = (medium: string) => {
    switch (medium) {
      case 'writing': return '✍️';
      case 'visual': return '🎨';
      case 'music': return '🎵';
      case 'mixed': return '🌈';
      default: return '💡';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 p-4 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Sparkles className="text-yellow-400" />
            Inspiración Diaria
          </h1>
          <p className="text-gray-300 mt-1">
            Alimenta tu creatividad y bienestar con contenido inspirador cada día
          </p>
        </div>

        {/* Daily Quote */}
        <Card className="mb-6 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Quote className="text-yellow-400" />
              Cita del Día
            </CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="text-xl text-yellow-100 font-medium italic mb-4">
              "{dailyQuote.content}"
            </blockquote>
            <div className="flex items-center justify-between">
              <p className="text-yellow-300">— {dailyQuote.author}</p>
              <div className="flex items-center gap-2">
                <Badge className={getCategoryColor(dailyQuote.category)}>
                  {dailyQuote.category}
                </Badge>
                <button 
                  onClick={() => toggleLike(dailyQuote.id)}
                  className={`p-2 rounded-full transition-colors ${
                    likedContent.includes(dailyQuote.id) 
                      ? 'bg-red-500/20 text-red-400' 
                      : 'bg-gray-700/50 text-gray-400 hover:text-red-400'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full bg-gray-700/50 text-gray-400 hover:text-blue-400 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Creative Prompts */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Palette className="text-cyan-400" />
                  Prompts Creativos Diarios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {creativePrompts.map((prompt) => (
                    <div key={prompt.id} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{getMediumIcon(prompt.medium)}</span>
                          <h3 className="text-white font-medium">{prompt.title}</h3>
                        </div>
                        {prompt.isCompleted && (
                          <Badge className="bg-green-500/20 text-green-300">
                            ✓ Completado
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-300 text-sm mb-4">{prompt.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-xs">
                          ⏱️ {prompt.timeLimit} min
                        </span>
                        <Button 
                          size="sm"
                          onClick={() => completePrompt(prompt.id)}
                          disabled={prompt.isCompleted}
                          className={prompt.isCompleted 
                            ? "bg-gray-600 text-gray-400" 
                            : "bg-cyan-600 hover:bg-cyan-700"
                          }
                        >
                          {prompt.isCompleted ? 'Completado' : 'Empezar'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tips & Techniques */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BookOpen className="text-purple-400" />
                  Consejos y Técnicas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inspirations.map((inspiration) => (
                    <div key={inspiration.id} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(inspiration.type)}
                          <h3 className="text-white font-medium">{inspiration.title}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getCategoryColor(inspiration.category)}>
                            {inspiration.category}
                          </Badge>
                          <span className="text-gray-400 text-xs">
                            {inspiration.timeToRead} min
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed mb-4">
                        {inspiration.content}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge className={
                          inspiration.difficulty === 'easy' ? 'bg-green-500/20 text-green-300' :
                          inspiration.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-red-500/20 text-red-300'
                        }>
                          {inspiration.difficulty}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => toggleLike(inspiration.id)}
                            className={`p-2 rounded-full transition-colors ${
                              likedContent.includes(inspiration.id) 
                                ? 'bg-red-500/20 text-red-400' 
                                : 'bg-gray-700/50 text-gray-400 hover:text-red-400'
                            }`}
                          >
                            <Heart className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-full bg-gray-700/50 text-gray-400 hover:text-blue-400 transition-colors">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 justify-start">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Inspiración Random
                  </Button>
                  <Button className="w-full bg-cyan-600 hover:bg-cyan-700 justify-start">
                    <Camera className="w-4 h-4 mr-2" />
                    Capturar Momento
                  </Button>
                  <Button className="w-full bg-green-600 hover:bg-green-700 justify-start">
                    <Heart className="w-4 h-4 mr-2" />
                    Mis Favoritos
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Today's Focus */}
            <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-700/50">
              <CardHeader>
                <CardTitle className="text-white">🎯 Enfoque del Día</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h3 className="text-blue-400 font-semibold">Expresión Libre</h3>
                  <p className="text-gray-300 text-sm">
                    Hoy dedica tiempo a crear sin restricciones. No busques perfección, 
                    busca autenticidad en tu expresión.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Lightbulb className="w-3 h-3" />
                    <span>Recomendación personalizada</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Challenge */}
            <Card className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border-orange-700/50">
              <CardHeader>
                <CardTitle className="text-white">🏆 Desafío Semanal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h3 className="text-orange-400 font-semibold">7 Días de Gratitud Visual</h3>
                  <p className="text-gray-300 text-sm">
                    Cada día, captura o crea una imagen que represente algo por lo que estás agradecido.
                  </p>
                  <div className="text-xs text-gray-400">
                    Día 3 de 7 • 892 participantes
                  </div>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    Ver Mi Progreso
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Inspiration Stats */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Tu Progreso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Prompts completados</span>
                    <span className="text-cyan-400 font-bold">
                      {creativePrompts.filter(p => p.isCompleted).length}/{creativePrompts.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Contenido guardado</span>
                    <span className="text-purple-400 font-bold">{likedContent.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Racha de inspiración</span>
                    <span className="text-yellow-400 font-bold">7 días</span>
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