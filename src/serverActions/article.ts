"use server";
import { prisma } from "@/lib/prisma";
import type { Article } from "@/generated/prisma/client";
import { pr } from "@/lib/pr";
import { revalidatePath } from "next/cache";

// helper `pr` removed — keep imports minimal for server action serialization

export async function fetchArticles(): Promise<Article[]> {
  const articles = await prisma.article.findMany({
    include: { author: true, comments: true },
    orderBy: {
      createdAt: "asc", // 'desc' للأحدث أولاً، 'asc' للأقدم أولاً
    },
  });

  return articles;
}

export async function getArticleById(idd: String) {
  const id = Number(idd);
  const article = await prisma.article.findUnique({
    where: { id },
    include: {
      comments: true,
      author: true,
    },
  });

  return article;
}

export async function createArticle(formData: FormData): Promise<void> {
  // Parse values from the submitted FormData. Form fields should be named
  // `title`, `body`, `published`, and `authorId` in the form.
  const title = formData.get("title")?.toString() ?? "";
  const body = formData.get("body")?.toString() ?? null;
  const publishedRaw = formData.get("published");
  const published =
    publishedRaw === "on" || publishedRaw === "true" || publishedRaw === "1";

  const authorId = Number(formData.get("authorId"));

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
  revalidatePath("");
  return { ok: true };
}

export async function updateArticle(formData: FormData) {
  // 1. استخراج البيانات من الـ FormData
  const id = Number(formData.get("id")); // نحتاج الـ ID لنعرف أي مقال سنعدل
  const title = formData.get("title")?.toString();
  const body = formData.get("body")?.toString();
  const publishedRaw = formData.get("published");
  const published = publishedRaw === "on" || publishedRaw === "true";

  // 2. التحقق من وجود المعرف
  if (!id || Number.isNaN(id)) {
    throw new Error("Article ID is required for update");
  }

  try {
    // 3. تنفيذ عملية التحديث في قاعدة البيانات
    await prisma.article.update({
      where: { id },
      data: {
        title: title || undefined, // إذا لم يتم إرسال عنوان جديد، يحتفظ بالقديم
        body: body ?? undefined,
        published: published,
      },
    });

    // 4. تحديث الكاش (Cache) لضمان ظهور البيانات الجديدة
    revalidatePath("/"); // أو المسار الخاص بالمقال

    return { ok: true, message: "تم التحديث بنجاح" };
  } catch (error) {
    console.error("Update Error:", error);
    return { ok: false, message: "فشل التحديث" };
  }
}
export async function deleteArticle(id: number) {
  await prisma.article.delete({ where: { id } });
  revalidatePath("/");
}
