import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TodayOverviewSimple() {
  return (
    <Card className="glass-effect border-white/10 card-hover bg-gradient-to-br from-indigo-600/50 to-purple-700/50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-white/80 uppercase tracking-wide">
            TODAY'S OVERVIEW
          </h2>
        </div>
        
        <blockquote className="text-xl font-light mb-6 leading-relaxed text-white">
          "Creativity is intelligence having fun."
        </blockquote>
        
        <div className="flex space-x-3 flex-wrap gap-2">
          <Button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl text-sm font-medium text-white transition-colors">
            5 Tasks
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl text-sm font-medium text-white transition-colors">
            Breathe
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl text-sm font-medium text-white transition-colors">
            Write
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}