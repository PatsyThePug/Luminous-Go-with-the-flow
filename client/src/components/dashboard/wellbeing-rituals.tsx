import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Wind, Star } from "lucide-react";

export default function WellbeingRituals() {
  const rituals = [
    {
      icon: Leaf,
      title: "Guided Meditation",
      bgColor: "bg-primary/20",
      iconColor: "text-primary",
    },
    {
      icon: Wind,
      title: "Breathing Exercises",
      bgColor: "bg-primary/20",
      iconColor: "text-primary",
    },
    {
      icon: Star,
      title: "Habit Tracker",
      bgColor: "bg-primary/20",
      iconColor: "text-primary",
    },
  ];

  return (
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
              className="w-full flex items-center space-x-3 p-3 bg-secondary hover:bg-accent rounded-xl transition-colors justify-start h-auto"
            >
              <div className={`w-8 h-8 ${ritual.bgColor} rounded-lg flex items-center justify-center`}>
                <ritual.icon className={`w-4 h-4 ${ritual.iconColor}`} />
              </div>
              <span className="font-medium text-white">{ritual.title}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
