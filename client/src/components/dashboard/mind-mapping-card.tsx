import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

export default function MindMappingCard() {
  return (
    <Card className="glass-effect border-white/10 card-hover bg-gradient-to-br from-indigo-600/50 to-indigo-800/50">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">Try mind mapping</h3>
            <p className="text-white/70">to generate new ideas</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
