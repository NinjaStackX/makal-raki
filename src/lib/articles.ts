import { Article } from "@/utils/types";

export async function getArticleById(id: string): Promise<Article | null> {
  if (!id) return null;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    cache: "force-cache",
  });
  if (!res.ok) return null;
  return await res.json();
}

export async function getAuthorNameByUserId(
  userId?: number
): Promise<string | undefined> {
  if (!userId) return undefined;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
    { cache: "force-cache" }
  );
  if (!res.ok) return undefined;
  const data = await res.json();
  return data?.name;
}
