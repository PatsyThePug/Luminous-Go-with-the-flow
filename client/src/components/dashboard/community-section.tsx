import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageCircle } from "lucide-react";

export default function CommunitySection() {
  const communityItems = [
    {
      icon: Users,
      title: "Join discussions",
      bgColor: "bg-teal-500/30",
      iconColor: "text-teal-200",
    },
    {
      icon: MessageCircle,
      title: "Weekly Challenge",
      bgColor: "bg-teal-500/30",
      iconColor: "text-teal-200",
    },
  ];

  return (
    <Card className="glass-effect border-white/10 card-hover bg-gradient-to-br from-teal-600/50 to-teal-800/50">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-white/80 uppercase tracking-wide">
          COMMUNITY & CHALLENGES
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {communityItems.map((item, index) => (
            <Button
              key={index}
              className="w-full flex items-center space-x-4 p-4 bg-teal-700/50 hover:bg-teal-600/60 rounded-xl transition-colors justify-start h-auto text-white"
            >
              <div className={`w-10 h-10 ${item.bgColor} rounded-xl flex items-center justify-center`}>
                <item.icon className={`w-5 h-5 ${item.iconColor}`} />
              </div>
              <span className="font-medium">{item.title}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}