"use server";

import prisma from "@/lib/prisma";
import { hash, compare } from "bcryptjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { encrypt } from "@/lib/crypto";

export async function registerAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) throw new Error("بيانات ناقصة");

  const hashedPassword = await hash(password, 10);

  try {
    const cookieStore = await cookies();

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const payloady = JSON.stringify({ session: user.id, userRole: user.role });
    const payload = await encrypt(payloady);
    cookieStore.set("state", payload, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  } catch (error: Error) {
    if (error.code === "P2002") throw new Error("الإيميل مستخدم");
    throw new Error("خطأ في النظام");
  }
  revalidatePath("/");
  redirect("/");
}

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("خطأ في البيانات");

  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) throw new Error("خطأ في البيانات");

  const cookieStore = await cookies();

  const payloady = JSON.stringify({ session: user.id, userRole: user.role });
  const payload = await encrypt(payloady);
  cookieStore.set("state", payload, {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  redirect("/");
}

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete("state");
  redirect("/");
}
