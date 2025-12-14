import React from "react";
import ArticleItem from "@/app/(routes)/articles/articleItem";
import { Article, Product } from "@/utils/types";

const page = async () => {
  let articles: Article[] = [];
  const timeout = 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      signal: controller.signal,
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    articles = await response.json();
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new Error("⏳ Request timed out");
    } else {
      throw new Error("❌ Fetch failed:", error);
    }
  } finally {
    clearTimeout(timer);
  }
  return (
    <section className="m-5    ">
      <div className="flex items-center justify-center flex-wrap gap-7">
        {articles?.map((e) => (
          <ArticleItem article={e} key={e.id} />
        ))}
      </div>
    </section>
  );
};

export default page;
