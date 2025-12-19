"use server";

import { prisma } from "@/lib/prisma";

export async function delItem(e: String, id: any) {
  const i = await prisma[`${e}`].delete({ where: { id } });

  console.log(i);
}
