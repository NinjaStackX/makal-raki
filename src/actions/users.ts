// app/(auth)/register/page.tsx
import React from "react";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const metadata = { title: "Register" };

export async function registerAction(formData: FormData) {
  "use server";

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password || !name) {
    throw new Error("Missing fields");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
    },
  });

  revalidatePath("/");

  return user;
}
export async function loginAction(formData: FormData) {
  "use server";

  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    // رمي خطأ بسيط؛ يمكن التقاطه في error boundary أو التعامل معه في الصفحة
    throw new Error("Missing fields");
  }

  try {
    const Ouser = await prisma.user.findUnique({ where: { email } });
    if (!Ouser) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, Ouser.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    // مثال: لا تُرجع الحقول الحساسة
    const user = { id: Ouser.id, email: Ouser.email };

    const cookieStore = await cookies();
    cookieStore.set("user", String(user.id), { httpOnly: true });

    return user;
  } catch (err) {
    // سجل الخطأ على السيرفر لأغراض الـ debugging
    console.error("loginAction error:", err);
    // أعد رمي رسالة عامة حتى لا تكشف تفاصيل داخلية
    throw new Error((err as Error).message || "Login failed");
  }
  redirect("/about");
}
