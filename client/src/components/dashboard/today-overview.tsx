import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";

interface Quote {
  content: string;
  author: string;
}

export default function TodayOverview() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data: quote, refetch } = useQuery<Quote>({
    queryKey: ["/api/wellness/quote"],
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });

  const { data: tasks = [] } = useQuery({
    queryKey: ["/api/tasks"],
  });

  const handleRefreshQuote = async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const pendingTasksCount = Array.isArray(tasks) ? tasks.filter((task: any) => !task.completed).length : 0;

  return (
    <Card className="glass-effect border-white/10 card-hover bg-gradient-to-br from-indigo-600/50 to-purple-700/50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-white/80 uppercase tracking-wide">
            TODAY'S OVERVIEW
          </h2>
          <Button
            onClick={handleRefreshQuote}
            variant="ghost"
            size="sm"
            className="text-white/60 hover:text-white"
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        
        <blockquote className="text-xl font-light mb-6 leading-relaxed text-white">
          "{quote?.content || 'Creativity is intelligence having fun.'}"
        </blockquote>
        
        <div className="flex space-x-3 flex-wrap gap-2">
          <Button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl text-sm font-medium text-white transition-colors">
            {pendingTasksCount} Tasks
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
