import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Leaf, Wind, Star, Play, Clock } from "lucide-react";

interface MeditationSession {
  title: string;
  duration: number;
  description: string;
  category: string;
}

interface BreathingExercise {
  name: string;
  duration: number;
  instructions: string[];
}

export default function WellbeingRituals() {
  const [selectedSession, setSelectedSession] = useState<MeditationSession | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<BreathingExercise | null>(null);
  const [isSessionOpen, setIsSessionOpen] = useState(false);
  const [isExerciseOpen, setIsExerciseOpen] = useState(false);

  const { data: sessions = [] } = useQuery<MeditationSession[]>({
    queryKey: ["/api/wellness/sessions"],
    staleTime: 1000 * 60 * 30, // Cache for 30 minutes
  });

  const { data: breathingExercise } = useQuery<BreathingExercise>({
    queryKey: ["/api/wellness/breathing"],
    staleTime: 1000 * 60 * 15, // Cache for 15 minutes
  });

  const handleMeditationClick = () => {
    if (sessions.length > 0) {
      setSelectedSession(sessions[0]);
      setIsSessionOpen(true);
    }
  };

  const handleBreathingClick = () => {
    if (breathingExercise) {
      setSelectedExercise(breathingExercise);
      setIsExerciseOpen(true);
    }
  };

  const rituals = [
    {
      icon: Leaf,
      title: "Guided Meditation",
      bgColor: "bg-gradient-to-r from-teal-600 to-teal-700",
      iconColor: "text-teal-200",
      onClick: handleMeditationClick,
    },
    {
      icon: Wind,
      title: "Breathing Exercises",
      bgColor: "bg-gradient-to-r from-teal-600 to-teal-700",
      iconColor: "text-teal-200",
      onClick: handleBreathingClick,
    },
    {
      icon: Star,
      title: "Habit Tracker",
      bgColor: "bg-gradient-to-r from-teal-600 to-teal-700",
      iconColor: "text-teal-200",
      onClick: () => {}, // Navigate to habits page later
    },
  ];

  return (
    <>
      <Card className="glass-effect border-white/10 card-hover">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-secondary uppercase tracking-wide">
            WELLBEING RITUALS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {rituals.map((ritual, index) => (
              <Button
                key={index}
                onClick={ritual.onClick}
                className={`w-full flex items-center space-x-3 p-4 ${ritual.bgColor} hover:opacity-90 rounded-xl transition-all justify-start h-auto`}
              >
                <div className="w-8 h-8 bg-teal-500/30 rounded-lg flex items-center justify-center">
                  <ritual.icon className={`w-4 h-4 ${ritual.iconColor}`} />
                </div>
                <span className="font-medium text-white">{ritual.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Meditation Session Modal */}
      <Dialog open={isSessionOpen} onOpenChange={setIsSessionOpen}>
        <DialogContent className="glass-effect border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center space-x-2">
              <Leaf className="w-5 h-5 text-teal-400" />
              <span>{selectedSession?.title}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-secondary">{selectedSession?.description}</p>
            <div className="flex items-center space-x-4 text-sm text-secondary">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{selectedSession?.duration} minutes</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4" />
                <span>{selectedSession?.category}</span>
              </div>
            </div>
            <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
              <Play className="w-4 h-4 mr-2" />
              Start Session
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Breathing Exercise Modal */}
      <Dialog open={isExerciseOpen} onOpenChange={setIsExerciseOpen}>
        <DialogContent className="glass-effect border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center space-x-2">
              <Wind className="w-5 h-5 text-blue-400" />
              <span>{selectedExercise?.name}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center space-x-1 text-sm text-secondary">
              <Clock className="w-4 h-4" />
              <span>{selectedExercise?.duration} minutes</span>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-medium">Instructions:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-secondary">
                {selectedExercise?.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Play className="w-4 h-4 mr-2" />
              Begin Exercise
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
