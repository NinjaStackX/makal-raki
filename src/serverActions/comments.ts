"use server";
import { pr } from "@/lib/pr";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function fetchComments() {
  const comments = await prisma.comment.findMany({});
  return comments;
}

export async function createComment(formData: FormData) {
  const content = formData.get("content")?.toString();
  const articleId = Number(formData.get("articleId"));
  const userId = Number(formData.get("userId"));

  if (!content || !articleId || !userId) {
    throw new Error("Missing required fields for comment");
  }

  try {
    await prisma.comment.create({
      data: {
        content,
        articleId,
        userId,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.error("Comment Creation Error:", error);
    throw new Error("Failed to add comment. Ensure IDs are correct.");
  }
}
export async function deleteComment(id: number) {
  await prisma.comment.delete({ where: { id } });
  revalidatePath("/");
}
export const fetchCommentsByArticleId = async (articleId: string) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        articleId: parseInt(articleId), // تأكد من تحويل النوع حسب قاعدة بياناتك
      },
      include: {
        user: {
          // جلب بيانات المستخدم صاحب التعليق
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        id: "desc", // عرض الأحدث أولاً
      },
    });
    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};
