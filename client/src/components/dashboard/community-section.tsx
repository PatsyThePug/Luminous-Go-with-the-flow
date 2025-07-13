import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Lightbulb } from "lucide-react";

export default function CommunitySection() {
  return (
    <Card className="glass-effect border-white/10 card-hover">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-secondary uppercase tracking-wide">
          COMMUNITY & CHALLENGES
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Button className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 rounded-xl transition-colors justify-start h-auto">
            <div className="w-8 h-8 bg-teal-500/30 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-teal-200" />
            </div>
            <span className="font-medium text-white">Join discussions</span>
          </Button>
          
          <Button className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 rounded-xl transition-colors justify-start h-auto">
            <div className="w-8 h-8 bg-teal-500/30 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-teal-200" />
            </div>
            <span className="font-medium text-white">Weekly Challenge</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}