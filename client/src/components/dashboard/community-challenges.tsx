import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function CommunityChallenges() {
  return (
    <Card className="glass-effect border-white/10 card-hover bg-gradient-to-br from-indigo-700/50 to-purple-800/50">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">Community amping</h3>
            <p className="text-white/70">to generate new ideas</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
