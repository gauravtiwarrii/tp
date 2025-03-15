import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
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

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  articleCount: integer("article_count").default(0),
});

export const insertCategorySchema = createInsertSchema(categories).pick({
  name: true,
  slug: true,
  icon: true,
  color: true,
  articleCount: true,
});

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url").notNull(),
  sourceUrl: text("source_url").notNull(),
  categoryId: integer("category_id").notNull(),
  isAiGenerated: boolean("is_ai_generated").default(false),
  isFeatured: boolean("is_featured").default(false),
  isTrending: boolean("is_trending").default(false),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
  author: text("author").notNull(),
  authorImageUrl: text("author_image_url"),
});

export const insertArticleSchema = createInsertSchema(articles).pick({
  title: true,
  slug: true,
  summary: true,
  content: true,
  imageUrl: true,
  sourceUrl: true,
  categoryId: true,
  isAiGenerated: true,
  isFeatured: true,
  isTrending: true,
  publishedAt: true,
  author: true,
  authorImageUrl: true,
});

export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type Article = typeof articles.$inferSelect;
