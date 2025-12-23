"use server";
import { prisma } from "@/lib/prisma";
import type { Article } from "@/generated/prisma/client";
import { pr } from "@/lib/pr";
// helper `pr` removed — keep imports minimal for server action serialization

export async function fetchArticles(): Promise<Article[]> {
  const articles = await prisma.article.findMany({
    include: { author: true, comments: true },
  });

  return articles;
}
export async function createArticle(formData: FormData): Promise<void> {
  // Parse values from the submitted FormData. Form fields should be named
  // `title`, `body`, `published`, and `authorId` in the form.
  const title = formData.get("title")?.toString() ?? "";
  const body = formData.get("body")?.toString() ?? null;
  const publishedRaw = formData.get("published");
  const published =
    publishedRaw === "on" || publishedRaw === "true" || publishedRaw === "1";
  const authorIdRaw = formData.get("authorId")?.toString();
  const authorId = authorIdRaw ? parseInt(authorIdRaw, 10) : undefined;

  // Basic validation to avoid creating invalid rows and to ensure we pass
  // only serializable primitives to Prisma (no functions, no FormData iterator).
  if (!title) {
    throw new Error("Article title is required");
  }
  if (!authorId || Number.isNaN(authorId)) {
    throw new Error(
      "authorId (numeric) is required to connect the article to a user"
    );
  }

  await prisma.article.create({
    data: {
      title,
      body,
      published,
      // connect the existing user by id
      author: { connect: { id: authorId } },
    },
  });
}
