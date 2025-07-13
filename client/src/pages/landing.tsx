import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Star, Users, Heart, Paintbrush } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen luminous-gradient flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-center p-6 pt-12">
        <div className="flex items-center space-x-4">
          <img 
            src="/logo.svg" 
            alt="Luminous Logo" 
            className="w-12 h-12"
          />
          <h1 className="text-3xl font-bold text-white tracking-wide">LUMINOUS</h1>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-md mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-light text-white leading-tight">
              Creativity is intelligence having fun
            </h2>
            <p className="text-lg text-secondary opacity-80">
              Organize your creative projects and track your wellness journey with Luminous
            </p>
          </div>

          {/* Feature highlights */}
          <div className="space-y-4">
            <Card className="glass-effect border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Paintbrush className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-white">Creative Projects</h3>
                    <p className="text-sm text-secondary">Organize and track your creative work</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-white">Wellness Rituals</h3>
                    <p className="text-sm text-secondary">Build healthy habits and mindfulness</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-orange-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-white">Community</h3>
                    <p className="text-sm text-secondary">Connect with like-minded creators</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Button */}
          <div className="pt-6">
            <Button 
              onClick={() => window.location.href = '/api/login'}
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-xl"
              size="lg"
            >
              Get Started
            </Button>
          </div>

          <p className="text-xs text-secondary opacity-60">
            Start your creative wellness journey today
          </p>
        </div>
      </main>
    </div>
  );
}
