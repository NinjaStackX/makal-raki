import { cookies } from "next/headers";
import { prisma } from "../lib/prisma";

export async function useAuth() {
  const users = await prisma.user.findMany();

  const cookieStore = await cookies();
  const userId = cookieStore.get("user")?.value;
  const user = users.find((e) => e.id == Number(userId));
  const isLogin = user ? true : false;
  const isAdmin = user?.role ? true : false;

  return { user, isAdmin, isLogin };
}
