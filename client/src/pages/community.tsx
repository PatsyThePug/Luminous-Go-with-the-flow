import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Users, Trophy, MessageCircle, Star } from "lucide-react";
import type { CommunityPost, Challenge, ChallengeParticipation } from "@shared/schema";

export default function Community() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const queryClient = useQueryClient();
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "" });
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: posts = [] } = useQuery<CommunityPost[]>({
    queryKey: ["/api/community/posts"],
    enabled: isAuthenticated,
  });

  const { data: challenges = [] } = useQuery<Challenge[]>({
    queryKey: ["/api/challenges"],
    enabled: isAuthenticated,
  });

  const { data: participations = [] } = useQuery<ChallengeParticipation[]>({
    queryKey: ["/api/challenges/participations"],
    enabled: isAuthenticated,
  });

  const createPostMutation = useMutation({
    mutationFn: async (postData: { title: string; content: string; category: string }) => {
      await apiRequest("POST", "/api/community/posts", postData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/community/posts"] });
      setNewPost({ title: "", content: "", category: "" });
      setIsPostDialogOpen(false);
      toast({
        title: "Success",
        description: "Post created successfully!",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      });
    },
  });

  const joinChallengeMutation = useMutation({
    mutationFn: async (challengeId: number) => {
      await apiRequest("POST", `/api/challenges/${challengeId}/join`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/challenges/participations"] });
      toast({
        title: "Success",
        description: "Joined challenge successfully!",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to join challenge",
        variant: "destructive",
      });
    },
  });

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim() || !newPost.category.trim()) return;
    createPostMutation.mutate(newPost);
  };

  const isParticipatingInChallenge = (challengeId: number) => {
    return participations.some(p => p.challengeId === challengeId);
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'creative':
        return 'bg-purple-500/20 text-purple-400';
      case 'wellness':
        return 'bg-green-500/20 text-green-400';
      case 'inspiration':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'challenge':
        return 'bg-orange-500/20 text-orange-400';
      default:
        return 'bg-blue-500/20 text-blue-400';
    }
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <main className="px-4 pb-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold text-white">Community</h1>
            <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-effect border-white/10">
                <DialogHeader>
                  <DialogTitle className="text-white">Create New Post</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Post title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="bg-secondary border-white/10 text-white"
                  />
                  <Textarea
                    placeholder="Share your thoughts..."
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    className="bg-secondary border-white/10 text-white"
                    rows={4}
                  />
                  <Select value={newPost.category} onValueChange={(value) => setNewPost({ ...newPost, category: value })}>
                    <SelectTrigger className="bg-secondary border-white/10 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="creative">Creative</SelectItem>
                      <SelectItem value="wellness">Wellness</SelectItem>
                      <SelectItem value="inspiration">Inspiration</SelectItem>
                      <SelectItem value="challenge">Challenge</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={handleCreatePost}
                    disabled={createPostMutation.isPending || !newPost.title.trim() || !newPost.content.trim() || !newPost.category.trim()}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {createPostMutation.isPending ? "Creating..." : "Create Post"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Community Posts */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold text-white mb-4">Recent Discussions</h2>
            {posts.length === 0 ? (
              <Card className="glass-effect border-white/10">
                <CardContent className="p-8 text-center">
                  <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No Posts Yet</h3>
                  <p className="text-muted-foreground mb-4">Start the conversation by creating the first post</p>
                  <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-primary hover:bg-primary/90">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Post
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </CardContent>
              </Card>
            ) : (
              posts.map((post) => (
                <Card key={post.id} className="glass-effect border-white/10">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">{post.title}</CardTitle>
                      <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-secondary mb-4">{post.content}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <span>👤 Anonymous</span>
                        <span>❤️ {post.likesCount}</span>
                      </div>
                      <span>{new Date(post.createdAt!).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Active Challenges */}
            <Card className="glass-effect border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                  Active Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                {challenges.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No active challenges</p>
                ) : (
                  <div className="space-y-3">
                    {challenges.slice(0, 3).map((challenge) => {
                      const isParticipating = isParticipatingInChallenge(challenge.id);
                      
                      return (
                        <div key={challenge.id} className="p-3 bg-secondary rounded-lg">
                          <h4 className="font-medium text-white text-sm">{challenge.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{challenge.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(challenge.category)}`}>
                              {challenge.category}
                            </span>
                            <Button
                              size="sm"
                              onClick={() => joinChallengeMutation.mutate(challenge.id)}
                              disabled={isParticipating || joinChallengeMutation.isPending}
                              className={`text-xs ${
                                isParticipating 
                                  ? 'bg-green-500/20 text-green-400 cursor-not-allowed' 
                                  : 'bg-primary hover:bg-primary/90'
                              }`}
                            >
                              {isParticipating ? 'Joined' : 'Join'}
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card className="glass-effect border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-400" />
                  Community Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Posts</span>
                    <span className="text-white font-medium">{posts.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Active Challenges</span>
                    <span className="text-white font-medium">{challenges.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Your Participations</span>
                    <span className="text-white font-medium">{participations.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inspiration Card */}
            <Card className="glass-effect border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Star className="w-8 h-8 text-yellow-400" />
                  <div>
                    <h4 className="font-medium text-white">Community amping</h4>
                    <p className="text-xs text-muted-foreground">Connect with creative minds and share inspiration</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
