// src/lib/api.ts
import type { Article as ArticleType } from "@/utils/types"; // اختياري: إذا عندك نوع مخصص

import { prisma } from "../lib/prisma";

export async function getArticleById(id: string) {
  if (!id || !/^\d+$/.test(id)) return null;
  const articleId = Number(id);

  try {
    const article = await prisma.article.findUnique({
      where: { id: articleId },
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
        comments: {
          select: { id: true, content: true, articleId: true },
          orderBy: { id: "asc" },
        },
      },
    });

    return article;
  } catch (err) {
    return null;
  }
}

/**
 * ترجع اسم المؤلف بناءً على userId
 */
export async function getAuthorNameByUserId(
  userId?: number
): Promise<string | undefined> {
  if (!userId || typeof userId !== "number") return undefined;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true },
    });
    return user?.name ?? undefined;
  } catch (err) {
    return undefined;
  }
}

export async function fetchArticles(): Promise<ArticleType[]> {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
        comments: {
          select: { id: true, content: true, articleId: true },
          orderBy: { id: "asc" },
        },
      },
    });

    return articles.map((a) => ({
      id: a.id,
      title: a.title,
      body: a.body ?? null,
      published: a.published,
      author: a.author
        ? {
            id: a.author.id,
            name: a.author.name ?? undefined,
            email: a.author.email,
          }
        : undefined,
      createdAt: a.createdAt.toISOString(),
      updatedAt: a.updatedAt.toISOString(),
      comments: a.comments.map((c) => ({
        id: c.id,
        content: c.content,
        articleId: c.articleId,
      })),
    })) as unknown as ArticleType[];
  } catch (err) {
    console.error("fetchArticles error:", err);
    return [];
  }
}
