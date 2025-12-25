"use server";
import { prisma } from "@/lib/prisma";
import { Prisma, type User } from "@/generated/prisma/client";
import type { Role } from "@/generated/prisma/enums";
import { pr } from "@/lib/pr";
import { revalidatePath } from "next/cache";
import { hash } from "bcryptjs"; // يفضل تشفير كلمة المرور

// Use a plain serializable DTO for server actions. Server Actions serialize their
// arguments; passing complex objects (FormData, events, functions) will fail.
export type CreateUserDTO = {
  email: string;
  name?: string | null;
  password: string;
  role?: Role;
};

export async function fetchUsers(): Promise<User[]> {
  const users = await prisma.user.findMany({
    include: {
      articles: {
        include: {
          comments: true, // تعليقات المقالات
        },
      },
      comments: true, // تعليقات المستخدم نفسه
    },
  });
  return users;
}

export async function createUser(formData: FormData): Promise<void> {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;
  const role = (formData.get("role") as string) || "USER";

  try {
    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: role as any,
      },
    });

    revalidatePath("/");
    return { ok: true };
  } catch (error: any) {
    // Handling Prisma-specific known errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error(
          "This email is already registered. Please use a different one."
        );
      }
    }

    // Handling other types of errors
    console.error("Database Error:", error);
    throw new Error(
      error.message || "An unexpected error occurred while creating the user."
    );
  }
}

export async function updateUserDetails(formData: FormData) {
  const id = Number(formData.get("id"));
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as String;

  let updateData: any = {};
  try {
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role as Role;

    // 3. تشفير كلمة المرور فقط إذا تم إدخالها
    if (password && password.trim() !== "") {
      updateData.password = await hash(password, 10);
    }
    pr({ updateData: updateData });
    // إذا قام المستخدم بإدخال كلمة مرور جديدة، نقوم بتشفيرها
    if (password && password.trim() !== "") {
      updateData.password = await hash(password, 10);
    }

    await prisma.user.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/"); // تحديث البيانات في الصفحة
    return { ok: true, message: "User updated successfully" };
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error("This email is already in use by another account.");
      }
    }

    console.error("Update Error:", error);
    throw new Error("Failed to update user details.");
  }
}

export async function deleteUser(id: number) {
  await prisma.user.delete({ where: { id } });
  revalidatePath("/");
}
