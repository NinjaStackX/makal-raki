import { cookies } from "next/headers";
import { prisma } from "./prisma";

export async function useUser() {
  const users = await prisma.user.findMany();

  const cookieStore = await cookies();
  const userId = cookieStore.get("user")?.value;
  const user = users.find((e) => e.id == Number(userId));

  return { user };
}
