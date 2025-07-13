import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function CommunityChallenges() {
  return (
    <Card className="glass-effect border-white/10 card-hover">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center flex-shrink-0">
            <Star className="text-white w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-white leading-tight">
              Community amping to generate new ideas
            </h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
