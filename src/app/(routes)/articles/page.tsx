import React from "react";
import ArticleItem from "@/app/(routes)/articles/articleItem";
import { Article, Product } from "@/utils/types";

const page = async () => {
  let articles: Article[] = [];
  try {
    const respone = await fetch("https://jsonplaceholder.typicode.com/posts", {
      cache: "force-cache",
    });
    articles = await respone.json();
  } catch (error) {
    throw new Error("Failed to fetch articles");
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
