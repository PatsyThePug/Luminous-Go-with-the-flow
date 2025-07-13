import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function WellbeingRitualsSimple() {
  return (
    <Card className="glass-effect border-white/10 card-hover bg-gradient-to-br from-teal-700/50 to-teal-900/50">
      <CardContent className="p-6">
        <h2 className="text-sm font-medium text-white/80 uppercase tracking-wide mb-6">
          WELLBEING RITUALS
        </h2>
        
        <div className="space-y-4">
          <Button className="w-full flex items-center space-x-4 p-4 bg-teal-700/50 hover:bg-teal-600/60 rounded-xl text-white justify-start h-auto">
            <div className="w-10 h-10 bg-teal-500/30 rounded-xl flex items-center justify-center">
              <div className="w-5 h-5 bg-teal-200 rounded-full"></div>
            </div>
            <span className="font-medium">Guided Meditation</span>
          </Button>
          
          <Button className="w-full flex items-center space-x-4 p-4 bg-teal-700/50 hover:bg-teal-600/60 rounded-xl text-white justify-start h-auto">
            <div className="w-10 h-10 bg-teal-500/30 rounded-xl flex items-center justify-center">
              <div className="w-5 h-5 bg-teal-200 rounded-full"></div>
            </div>
            <span className="font-medium">Breathing Exercises</span>
          </Button>
          
          <Button className="w-full flex items-center space-x-4 p-4 bg-teal-700/50 hover:bg-teal-600/60 rounded-xl text-white justify-start h-auto">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <div className="w-5 h-5 bg-white rounded-full"></div>
            </div>
            <span className="font-medium">Habit Tracker</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}