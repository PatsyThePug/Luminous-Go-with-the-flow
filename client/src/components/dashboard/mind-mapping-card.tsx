import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function MindMappingCard() {
  return (
    <Card className="glass-effect border-white/10 card-hover">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
            <Star className="text-white text-xl w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-white">Try mind mapping to generate new ideas</h3>
            <p className="text-secondary text-sm">Connect with creative minds and share inspiration</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
