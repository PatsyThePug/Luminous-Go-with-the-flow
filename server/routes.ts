import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { getWellnessData, getDailyQuote, getMindfulnessQuote, getRecommendedSessions, getBreathingExercise } from "./wellness-apis";
import { insertProjectSchema, insertTaskSchema, insertHabitSchema, insertHabitEntrySchema, insertCommunityPostSchema, insertChallengeParticipationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Admin routes - User management
  app.get('/api/admin/users', isAuthenticated, async (req: any, res) => {
    try {
      const currentUserId = req.user.claims.sub;
      const currentUser = await storage.getUser(currentUserId);
      
      // Simple admin check - first user is admin or specific email
      const isAdmin = currentUser?.email === 'alejandrabarcena2022@gmail.com' || 
                     currentUser?.id === '40449144';
      
      if (!isAdmin) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.get('/api/admin/users/:userId/profile', isAuthenticated, async (req: any, res) => {
    try {
      const currentUserId = req.user.claims.sub;
      const currentUser = await storage.getUser(currentUserId);
      
      const isAdmin = currentUser?.email === 'alejandrabarcena2022@gmail.com' || 
                     currentUser?.id === '40449144';
      
      if (!isAdmin) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const userId = req.params.userId;
      const user = await storage.getUser(userId);
      const projects = await storage.getUserProjects(userId);
      const habits = await storage.getUserHabits(userId);
      const posts = await storage.getUserCommunityPosts(userId);
      
      res.json({
        user,
        stats: {
          projects: projects.length,
          habits: habits.length,
          posts: posts.length
        },
        recentActivity: {
          projects: projects.slice(0, 5),
          habits: habits.slice(0, 5),
          posts: posts.slice(0, 5)
        }
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ message: "Failed to fetch user profile" });
    }
  });

  // Project routes
  app.get('/api/projects', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const projects = await storage.getUserProjects(userId);
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.post('/api/projects', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const projectData = insertProjectSchema.parse({ ...req.body, userId });
      const project = await storage.createProject(projectData);
      res.json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  app.put('/api/projects/:id', isAuthenticated, async (req: any, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const updates = req.body;
      const project = await storage.updateProject(projectId, updates);
      res.json(project);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ message: "Failed to update project" });
    }
  });

  app.delete('/api/projects/:id', isAuthenticated, async (req: any, res) => {
    try {
      const projectId = parseInt(req.params.id);
      await storage.deleteProject(projectId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  // Task routes
  app.get('/api/tasks', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const tasks = await storage.getUserTasks(userId);
      res.json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ message: "Failed to fetch tasks" });
    }
  });

  app.get('/api/projects/:id/tasks', isAuthenticated, async (req: any, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const tasks = await storage.getProjectTasks(projectId);
      res.json(tasks);
    } catch (error) {
      console.error("Error fetching project tasks:", error);
      res.status(500).json({ message: "Failed to fetch project tasks" });
    }
  });

  app.post('/api/tasks', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const taskData = insertTaskSchema.parse({ ...req.body, userId });
      const task = await storage.createTask(taskData);
      res.json(task);
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ message: "Failed to create task" });
    }
  });

  app.put('/api/tasks/:id', isAuthenticated, async (req: any, res) => {
    try {
      const taskId = parseInt(req.params.id);
      const updates = req.body;
      const task = await storage.updateTask(taskId, updates);
      res.json(task);
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ message: "Failed to update task" });
    }
  });

  app.delete('/api/tasks/:id', isAuthenticated, async (req: any, res) => {
    try {
      const taskId = parseInt(req.params.id);
      await storage.deleteTask(taskId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ message: "Failed to delete task" });
    }
  });

  // Habit routes
  app.get('/api/habits', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const habits = await storage.getUserHabits(userId);
      res.json(habits);
    } catch (error) {
      console.error("Error fetching habits:", error);
      res.status(500).json({ message: "Failed to fetch habits" });
    }
  });

  app.post('/api/habits', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const habitData = insertHabitSchema.parse({ ...req.body, userId });
      const habit = await storage.createHabit(habitData);
      res.json(habit);
    } catch (error) {
      console.error("Error creating habit:", error);
      res.status(500).json({ message: "Failed to create habit" });
    }
  });

  // Habit entry routes
  app.get('/api/habit-entries', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const date = req.query.date ? new Date(req.query.date as string) : undefined;
      const entries = await storage.getUserHabitEntries(userId, date);
      res.json(entries);
    } catch (error) {
      console.error("Error fetching habit entries:", error);
      res.status(500).json({ message: "Failed to fetch habit entries" });
    }
  });

  app.post('/api/habit-entries', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const entryData = insertHabitEntrySchema.parse({ ...req.body, userId });
      const entry = await storage.createHabitEntry(entryData);
      res.json(entry);
    } catch (error) {
      console.error("Error creating habit entry:", error);
      res.status(500).json({ message: "Failed to create habit entry" });
    }
  });

  // Community routes
  app.get('/api/community/posts', isAuthenticated, async (req: any, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;
      const posts = await storage.getCommunityPosts(limit);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching community posts:", error);
      res.status(500).json({ message: "Failed to fetch community posts" });
    }
  });

  app.post('/api/community/posts', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const postData = insertCommunityPostSchema.parse({ ...req.body, userId });
      const post = await storage.createCommunityPost(postData);
      res.json(post);
    } catch (error) {
      console.error("Error creating community post:", error);
      res.status(500).json({ message: "Failed to create community post" });
    }
  });

  // Challenge routes
  app.get('/api/challenges', isAuthenticated, async (req: any, res) => {
    try {
      const challenges = await storage.getActiveChallenges();
      res.json(challenges);
    } catch (error) {
      console.error("Error fetching challenges:", error);
      res.status(500).json({ message: "Failed to fetch challenges" });
    }
  });

  app.get('/api/challenges/participations', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const participations = await storage.getUserChallengeParticipations(userId);
      res.json(participations);
    } catch (error) {
      console.error("Error fetching challenge participations:", error);
      res.status(500).json({ message: "Failed to fetch challenge participations" });
    }
  });

  app.post('/api/challenges/:id/join', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const challengeId = parseInt(req.params.id);
      const participationData = insertChallengeParticipationSchema.parse({
        challengeId,
        userId,
      });
      const participation = await storage.joinChallenge(participationData);
      res.json(participation);
    } catch (error) {
      console.error("Error joining challenge:", error);
      res.status(500).json({ message: "Failed to join challenge" });
    }
  });

  // Wellness API endpoints
  app.get("/api/wellness/daily", async (req, res) => {
    try {
      const wellnessData = await getWellnessData();
      res.json(wellnessData);
    } catch (error) {
      console.error("Error fetching wellness data:", error);
      res.status(500).json({ message: "Failed to fetch wellness data" });
    }
  });

  app.get("/api/wellness/quote", async (req, res) => {
    try {
      const quote = await getDailyQuote();
      res.json(quote);
    } catch (error) {
      console.error("Error fetching daily quote:", error);
      res.status(500).json({ message: "Failed to fetch quote" });
    }
  });

  app.get("/api/wellness/mindfulness-quote", async (req, res) => {
    try {
      const quote = await getMindfulnessQuote();
      res.json(quote);
    } catch (error) {
      console.error("Error fetching mindfulness quote:", error);
      res.status(500).json({ message: "Failed to fetch mindfulness quote" });
    }
  });

  app.get("/api/wellness/sessions", async (req, res) => {
    try {
      const sessions = await getRecommendedSessions();
      res.json(sessions);
    } catch (error) {
      console.error("Error fetching meditation sessions:", error);
      res.status(500).json({ message: "Failed to fetch meditation sessions" });
    }
  });

  app.get("/api/wellness/breathing", async (req, res) => {
    try {
      const exercise = await getBreathingExercise();
      res.json(exercise);
    } catch (error) {
      console.error("Error fetching breathing exercise:", error);
      res.status(500).json({ message: "Failed to fetch breathing exercise" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
