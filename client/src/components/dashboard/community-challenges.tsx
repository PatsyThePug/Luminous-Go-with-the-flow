import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Trophy } from "lucide-react";

export default function CommunityChallenges() {
  const activities = [
    {
      icon: Users,
      title: "Join discussions",
      bgColor: "bg-green-500/20",
      iconColor: "text-green-400",
    },
    {
      icon: Trophy,
      title: "Weekly Challenge",
      bgColor: "bg-green-500/20",
      iconColor: "text-green-400",
    },
  ];

  return (
    <Card className="glass-effect border-white/10 card-hover">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-secondary uppercase tracking-wide">
          COMMUNITY & CHALLENGES
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <Button
              key={index}
              className="w-full flex items-center space-x-3 p-3 bg-secondary hover:bg-accent rounded-xl transition-colors justify-start h-auto"
            >
              <div className={`w-8 h-8 ${activity.bgColor} rounded-lg flex items-center justify-center`}>
                <activity.icon className={`w-4 h-4 ${activity.iconColor}`} />
              </div>
              <span className="font-medium text-white">{activity.title}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
