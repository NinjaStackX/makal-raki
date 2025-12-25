"use server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/crypto";
import { prisma } from "@/lib/prisma";
import { pr } from "@/lib/pr";

export async function getServerData() {
  try {
    const cookieStore = await cookies();
    const encryptedState = cookieStore.get("state")?.value;

    if (!encryptedState) return null;

    const decryptedText = await decrypt(encryptedState);
    return JSON.parse(decryptedText);
  } catch (error) {
    console.error("فشل في استخراج بيانات الكوكي:", error);
    return null;
  }
}
export async function searchServerAction(formData: any) {
  const query = formData.get("search");

  if (!query || query.trim() === "") return { users: [], articles: [] };

  try {
    // نقوم بعمليتي البحث بالتوازي لزيادة السرعة (Performance)
    const [users, articles] = await Promise.all([
      // 1. البحث في المستخدمين حسب الاسم
      prisma.user.findMany({
        where: {
          name: {
            contains: query,
            mode: "insensitive", // تجاهل حالة الأحرف (كبير/صغير)
          },
        },
        select: { id: true, name: true, email: true, role: true },
      }),

      // 2. البحث في المقالات حسب العنوان أو المحتوى
      prisma.article.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { body: { contains: query, mode: "insensitive" } },
          ],
        },
        include: {
          author: {
            select: { name: true }, // جلب اسم الكاتب أيضاً
          },
        },
      }),
    ]);

    return { users, articles };
  } catch (error) {
    console.error("Search Error:", error);
    throw new Error("فشل البحث، يرجى المحاولة لاحقاً");
  }
}
