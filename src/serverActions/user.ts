"use server";
import { prisma } from "@/lib/prisma";
import type { User } from "@/generated/prisma/client";
import type { Role } from "@/generated/prisma/enums";
import { pr } from "@/lib/pr";

// Use a plain serializable DTO for server actions. Server Actions serialize their
// arguments; passing complex objects (FormData, events, functions) will fail.
export type CreateUserDTO = {
  email: string;
  name?: string | null;
  password: string;
  role?: Role;
};

export async function fetchUsers(): Promise<User[]> {
  const users = await prisma.user.findMany();
  return users;
}

export async function createUser(formData: FormData): Promise<void> {
  const email = formData.get("email")?.toString() ?? "";
  const name = formData.get("name")?.toString() ?? null;
  const password = formData.get("password")?.toString() ?? "";
  const roleRaw = formData.get("role")?.toString() ?? "USER";

  const safeData: CreateUserDTO = {
    email: String(email),
    name: name == null ? null : String(name),
    password: String(password),
    role: (roleRaw as Role) ?? undefined,
  };
  await prisma.user.create({ data: safeData as any });
}
