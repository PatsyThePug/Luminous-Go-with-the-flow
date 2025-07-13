import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table - mandatory for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table - mandatory for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Projects table
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  status: varchar("status", { length: 50 }).notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Tasks table
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id),
  userId: varchar("user_id").notNull().references(() => users.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  completed: boolean("completed").notNull().default(false),
  priority: varchar("priority", { length: 20 }).notNull().default("medium"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Habits table
export const habits = pgTable("habits", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 50 }).notNull(), // meditation, exercise, creative, etc.
  targetFrequency: varchar("target_frequency", { length: 20 }).notNull().default("daily"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Habit entries table
export const habitEntries = pgTable("habit_entries", {
  id: serial("id").primaryKey(),
  habitId: integer("habit_id").notNull().references(() => habits.id),
  userId: varchar("user_id").notNull().references(() => users.id),
  completedAt: timestamp("completed_at").notNull().defaultNow(),
  notes: text("notes"),
});

// Community posts table
export const communityPosts = pgTable("community_posts", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  likesCount: integer("likes_count").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Weekly challenges table
export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Challenge participations table
export const challengeParticipations = pgTable("challenge_participations", {
  id: serial("id").primaryKey(),
  challengeId: integer("challenge_id").notNull().references(() => challenges.id),
  userId: varchar("user_id").notNull().references(() => users.id),
  completed: boolean("completed").notNull().default(false),
  progress: integer("progress").notNull().default(0),
  joinedAt: timestamp("joined_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ createdAt: true, updatedAt: true });
export const insertProjectSchema = createInsertSchema(projects).omit({ id: true, createdAt: true, updatedAt: true });
export const insertTaskSchema = createInsertSchema(tasks).omit({ id: true, createdAt: true, updatedAt: true });
export const insertHabitSchema = createInsertSchema(habits).omit({ id: true, createdAt: true, updatedAt: true });
export const insertHabitEntrySchema = createInsertSchema(habitEntries).omit({ id: true });
export const insertCommunityPostSchema = createInsertSchema(communityPosts).omit({ id: true, createdAt: true, updatedAt: true, likesCount: true });
export const insertChallengeSchema = createInsertSchema(challenges).omit({ id: true, createdAt: true });
export const insertChallengeParticipationSchema = createInsertSchema(challengeParticipations).omit({ id: true, joinedAt: true });

// Types
export type UpsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Task = typeof tasks.$inferSelect;
export type InsertHabit = z.infer<typeof insertHabitSchema>;
export type Habit = typeof habits.$inferSelect;
export type InsertHabitEntry = z.infer<typeof insertHabitEntrySchema>;
export type HabitEntry = typeof habitEntries.$inferSelect;
export type InsertCommunityPost = z.infer<typeof insertCommunityPostSchema>;
export type CommunityPost = typeof communityPosts.$inferSelect;
export type InsertChallenge = z.infer<typeof insertChallengeSchema>;
export type Challenge = typeof challenges.$inferSelect;
export type InsertChallengeParticipation = z.infer<typeof insertChallengeParticipationSchema>;
export type ChallengeParticipation = typeof challengeParticipations.$inferSelect;
