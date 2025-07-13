import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Play, RefreshCw, Sparkles } from "lucide-react";

interface WellnessData {
  dailyQuote: {
    content: string;
    author: string;
  };
  recommendedSessions: Array<{
    title: string;
    duration: number;
    description: string;
    category: string;
  }>;
  breathingExercise: {
    name: string;
    duration: number;
    instructions: string[];
  };
}

export default function WellnessDashboard() {
  const { data: wellnessData, isLoading, refetch } = useQuery<WellnessData>({
    queryKey: ["/api/wellness/daily"],
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center p-8">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Daily Inspiration */}
      <Card className="glass-effect border-white/10 card-hover">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-secondary uppercase tracking-wide flex items-center">
              <Sparkles className="w-4 h-4 mr-2" />
              Daily Inspiration
            </CardTitle>
            <Button
              onClick={() => refetch()}
              variant="ghost"
              size="sm"
              className="text-secondary hover:text-white"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <blockquote className="text-lg font-light mb-2 leading-relaxed text-white">
            "{wellnessData?.dailyQuote.content}"
          </blockquote>
          <p className="text-sm text-secondary italic">— {wellnessData?.dailyQuote.author}</p>
        </CardContent>
      </Card>

      {/* Recommended Sessions */}
      <Card className="glass-effect border-white/10 card-hover">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-secondary uppercase tracking-wide">
            Recommended for You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {wellnessData?.recommendedSessions.map((session, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-secondary rounded-xl hover:bg-accent transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-white">{session.title}</h3>
                  <p className="text-sm text-secondary">{session.description}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {session.category}
                    </Badge>
                    <div className="flex items-center text-xs text-secondary">
                      <Clock className="w-3 h-3 mr-1" />
                      {session.duration}m
                    </div>
                  </div>
                </div>
                <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white">
                  <Play className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Today's Breathing Exercise */}
      <Card className="glass-effect border-white/10 card-hover">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-secondary uppercase tracking-wide">
            Today's Breathing Exercise
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">
                {wellnessData?.breathingExercise.name}
              </h3>
              <div className="flex items-center text-sm text-secondary">
                <Clock className="w-4 h-4 mr-1" />
                {wellnessData?.breathingExercise.duration}m
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-white">Instructions:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-secondary">
                {wellnessData?.breathingExercise.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
            
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Play className="w-4 h-4 mr-2" />
              Start Exercise
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}