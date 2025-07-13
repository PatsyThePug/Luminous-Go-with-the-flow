import {
  users,
  projects,
  tasks,
  habits,
  habitEntries,
  communityPosts,
  challenges,
  challengeParticipations,
  type User,
  type UpsertUser,
  type Project,
  type InsertProject,
  type Task,
  type InsertTask,
  type Habit,
  type InsertHabit,
  type HabitEntry,
  type InsertHabitEntry,
  type CommunityPost,
  type InsertCommunityPost,
  type Challenge,
  type InsertChallenge,
  type ChallengeParticipation,
  type InsertChallengeParticipation,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, gte, lte } from "drizzle-orm";

export interface IStorage {
  // User operations - mandatory for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Project operations
  getUserProjects(userId: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, updates: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: number): Promise<void>;

  // Task operations
  getProjectTasks(projectId: number): Promise<Task[]>;
  getUserTasks(userId: string): Promise<Task[]>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: number, updates: Partial<InsertTask>): Promise<Task>;
  deleteTask(id: number): Promise<void>;

  // Habit operations
  getUserHabits(userId: string): Promise<Habit[]>;
  createHabit(habit: InsertHabit): Promise<Habit>;
  updateHabit(id: number, updates: Partial<InsertHabit>): Promise<Habit>;
  deleteHabit(id: number): Promise<void>;

  // Habit entry operations
  getHabitEntries(habitId: number, startDate?: Date, endDate?: Date): Promise<HabitEntry[]>;
  getUserHabitEntries(userId: string, date?: Date): Promise<HabitEntry[]>;
  createHabitEntry(entry: InsertHabitEntry): Promise<HabitEntry>;

  // Community operations
  getCommunityPosts(limit?: number): Promise<CommunityPost[]>;
  createCommunityPost(post: InsertCommunityPost): Promise<CommunityPost>;
  getUserCommunityPosts(userId: string): Promise<CommunityPost[]>;

  // Challenge operations
  getActiveChallenges(): Promise<Challenge[]>;
  getUserChallengeParticipations(userId: string): Promise<ChallengeParticipation[]>;
  joinChallenge(participation: InsertChallengeParticipation): Promise<ChallengeParticipation>;
  updateChallengeProgress(id: number, progress: number, completed?: boolean): Promise<ChallengeParticipation>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Project operations
  async getUserProjects(userId: string): Promise<Project[]> {
    return await db.select().from(projects).where(eq(projects.userId, userId)).orderBy(desc(projects.updatedAt));
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }

  async updateProject(id: number, updates: Partial<InsertProject>): Promise<Project> {
    const [updatedProject] = await db
      .update(projects)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return updatedProject;
  }

  async deleteProject(id: number): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }

  // Task operations
  async getProjectTasks(projectId: number): Promise<Task[]> {
    return await db.select().from(tasks).where(eq(tasks.projectId, projectId)).orderBy(desc(tasks.createdAt));
  }

  async getUserTasks(userId: string): Promise<Task[]> {
    return await db.select().from(tasks).where(eq(tasks.userId, userId)).orderBy(desc(tasks.createdAt));
  }

  async createTask(task: InsertTask): Promise<Task> {
    const [newTask] = await db.insert(tasks).values(task).returning();
    return newTask;
  }

  async updateTask(id: number, updates: Partial<InsertTask>): Promise<Task> {
    const [updatedTask] = await db
      .update(tasks)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(tasks.id, id))
      .returning();
    return updatedTask;
  }

  async deleteTask(id: number): Promise<void> {
    await db.delete(tasks).where(eq(tasks.id, id));
  }

  // Habit operations
  async getUserHabits(userId: string): Promise<Habit[]> {
    return await db.select().from(habits).where(and(eq(habits.userId, userId), eq(habits.isActive, true))).orderBy(desc(habits.createdAt));
  }

  async createHabit(habit: InsertHabit): Promise<Habit> {
    const [newHabit] = await db.insert(habits).values(habit).returning();
    return newHabit;
  }

  async updateHabit(id: number, updates: Partial<InsertHabit>): Promise<Habit> {
    const [updatedHabit] = await db
      .update(habits)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(habits.id, id))
      .returning();
    return updatedHabit;
  }

  async deleteHabit(id: number): Promise<void> {
    await db.update(habits).set({ isActive: false }).where(eq(habits.id, id));
  }

  // Habit entry operations
  async getHabitEntries(habitId: number, startDate?: Date, endDate?: Date): Promise<HabitEntry[]> {
    let query = db.select().from(habitEntries).where(eq(habitEntries.habitId, habitId));
    
    if (startDate) {
      query = query.where(gte(habitEntries.completedAt, startDate));
    }
    if (endDate) {
      query = query.where(lte(habitEntries.completedAt, endDate));
    }
    
    return await query.orderBy(desc(habitEntries.completedAt));
  }

  async getUserHabitEntries(userId: string, date?: Date): Promise<HabitEntry[]> {
    let query = db.select().from(habitEntries).where(eq(habitEntries.userId, userId));
    
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      
      query = query.where(and(
        gte(habitEntries.completedAt, startOfDay),
        lte(habitEntries.completedAt, endOfDay)
      ));
    }
    
    return await query.orderBy(desc(habitEntries.completedAt));
  }

  async createHabitEntry(entry: InsertHabitEntry): Promise<HabitEntry> {
    const [newEntry] = await db.insert(habitEntries).values(entry).returning();
    return newEntry;
  }

  // Community operations
  async getCommunityPosts(limit: number = 20): Promise<CommunityPost[]> {
    return await db.select().from(communityPosts).orderBy(desc(communityPosts.createdAt)).limit(limit);
  }

  async createCommunityPost(post: InsertCommunityPost): Promise<CommunityPost> {
    const [newPost] = await db.insert(communityPosts).values(post).returning();
    return newPost;
  }

  async getUserCommunityPosts(userId: string): Promise<CommunityPost[]> {
    return await db.select().from(communityPosts).where(eq(communityPosts.userId, userId)).orderBy(desc(communityPosts.createdAt));
  }

  // Challenge operations
  async getActiveChallenges(): Promise<Challenge[]> {
    const now = new Date();
    return await db.select().from(challenges)
      .where(and(
        eq(challenges.isActive, true),
        lte(challenges.startDate, now),
        gte(challenges.endDate, now)
      ))
      .orderBy(desc(challenges.startDate));
  }

  async getUserChallengeParticipations(userId: string): Promise<ChallengeParticipation[]> {
    return await db.select().from(challengeParticipations)
      .where(eq(challengeParticipations.userId, userId))
      .orderBy(desc(challengeParticipations.joinedAt));
  }

  async joinChallenge(participation: InsertChallengeParticipation): Promise<ChallengeParticipation> {
    const [newParticipation] = await db.insert(challengeParticipations).values(participation).returning();
    return newParticipation;
  }

  async updateChallengeProgress(id: number, progress: number, completed?: boolean): Promise<ChallengeParticipation> {
    const updates: Partial<ChallengeParticipation> = { progress };
    if (completed !== undefined) {
      updates.completed = completed;
    }
    
    const [updatedParticipation] = await db
      .update(challengeParticipations)
      .set(updates)
      .where(eq(challengeParticipations.id, id))
      .returning();
    return updatedParticipation;
  }
}

export const storage = new DatabaseStorage();
