"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { hash } from "bcryptjs";
import { Role } from "@/utils/types";

export async function getUserById(id: number | string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: typeof id === "string" ? parseInt(id) : id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    return user || null;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
}

export async function fetchUsers() {
  return await prisma.user.findMany({
    include: {
      articles: {
        include: { comments: true },
      },
      comments: true,
    },
  });
}

export async function createUser(formData: FormData) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;
  const role = (formData.get("role") as string) || "USER";

  try {
    const hashedPassword = await hash(password, 10);
    await prisma.user.create({
      data: { email, name, password: hashedPassword, role: role as Role },
    });
    revalidatePath("/");
    return { ok: true };
  } catch (error: Error) {
    if (error.code === "P2002") throw new Error("الايميل مسجل مسبقاً");
    throw new Error("فشل إنشاء المستخدم");
  }
}

export async function updateUserDetails(formData: FormData) {
  const id = Number(formData.get("id"));
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

  const updateData: unknown = {};
  try {
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role;

    if (password && password.trim() !== "") {
      updateData.password = await hash(password, 10);
    }

    await prisma.user.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/");
    return { ok: true, message: "تم التحديث بنجاح" };
  } catch (error: unknown) {
    if (error.code === "P2002")
      throw new Error("الايميل مستخدم من قبل شخص آخر");
    throw new Error("فشل التحديث");
  }
}

export async function deleteUser(id: number) {
  try {
    await prisma.user.delete({ where: { id } });
    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
}
