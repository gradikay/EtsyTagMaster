import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  description: text("description").notNull(),
  category: text("category"),
  style: text("style"),
  generatedTags: text("generated_tags").array().notNull(),
  relevanceScore: integer("relevance_score").notNull(),
  createdAt: text("created_at").notNull()
});

export const insertTagSchema = createInsertSchema(tags).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertTag = z.infer<typeof insertTagSchema>;
export type Tag = typeof tags.$inferSelect;
