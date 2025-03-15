import { pgTable, text, serial, integer, boolean, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Article model
export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  summary: text("summary").notNull(),
  originalUrl: text("original_url").notNull(),
  imageUrl: text("image_url"),
  publishedAt: timestamp("published_at").notNull(),
  sourceId: text("source_id").notNull(),
  sourceName: text("source_name").notNull(),
  aiProcessed: boolean("ai_processed").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  viewCount: integer("view_count").default(0).notNull(),
  categoryId: integer("category_id"),
});

// Category model
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  imageUrl: text("image_url"),
});

// Tag model
export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
});

// Article-Tag relation
export const articleTags = pgTable("article_tags", {
  id: serial("id").primaryKey(),
  articleId: integer("article_id").notNull(),
  tagId: integer("tag_id").notNull(),
});

// Schema for article insertion
export const insertArticleSchema = createInsertSchema(articles).omit({
  id: true,
  createdAt: true,
  viewCount: true,
  aiProcessed: true
});

// Schema for category insertion
export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true
});

// Schema for tag insertion
export const insertTagSchema = createInsertSchema(tags).omit({
  id: true
});

// Schema for article-tag insertion
export const insertArticleTagSchema = createInsertSchema(articleTags).omit({
  id: true
});

// Type definitions
export type Article = typeof articles.$inferSelect;
export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Tag = typeof tags.$inferSelect;
export type InsertTag = z.infer<typeof insertTagSchema>;
export type ArticleTag = typeof articleTags.$inferSelect;
export type InsertArticleTag = z.infer<typeof insertArticleTagSchema>;
