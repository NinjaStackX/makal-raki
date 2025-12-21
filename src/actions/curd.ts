"use server";

import { prisma } from "@/lib/prisma";

export async function delItem(e: String, id: any) {
  const i = await prisma[`${e}`].delete({ where: { id } });
  console.log(i);
}
export async function updateItem(e: String, id: any, data: any) {
  const i = await prisma[`${e}`].update({ where: { id }, data });
  console.log(i);
}
export async function creatItem(e: String, data: any) {
  const i = await prisma[`${e}`].create({ data });
  console.log(i);
}
