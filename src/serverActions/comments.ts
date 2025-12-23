"use server";
import { pr } from "@/lib/pr";
import { prisma } from "@/lib/prisma";

export async function fetchComments() {
  const comments = await prisma.article.findMany({});
  return comments;
}
export async function createComment(formData: FormData): Promise<void> {
  pr(formData);
}
