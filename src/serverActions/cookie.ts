"use server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/crypto";

export async function getServerData() {
  const cookieStore = await cookies();
  const encryptedState = cookieStore.get("state")?.value;

  if (encryptedState) {
    const state = JSON.parse(await decrypt(encryptedState));
    return state;
  }
  return null;
}
