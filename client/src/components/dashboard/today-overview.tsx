import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function TodayOverview() {
  return (
    <Card className="glass-effect border-white/10 card-hover">
      <CardContent className="p-6">
        <h2 className="text-sm font-medium text-secondary mb-4 uppercase tracking-wide">
          TODAY'S OVERVIEW
        </h2>
        <blockquote className="text-2xl font-light mb-6 leading-relaxed text-white">
          "Creativity is intelligence having fun."
        </blockquote>
        <div className="flex space-x-3">
          <Button className="bg-secondary hover:bg-accent px-4 py-2 rounded-xl text-sm font-medium transition-colors">
            5 Tasks
          </Button>
          <Button className="bg-secondary hover:bg-accent px-4 py-2 rounded-xl text-sm font-medium transition-colors">
            Breathe
          </Button>
          <Button className="bg-accent-orange hover:bg-orange-600 px-4 py-2 rounded-xl text-sm font-medium transition-colors text-white">
            Write
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
