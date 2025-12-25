import React from "react";

import ArticleItem from "./articleItem";
import { fetchArticles } from "@/serverActions/article";

const Page = async () => {
  const articles = await fetchArticles();

  return (
    <section className="m-5">
      <div className="flex items-center justify-center flex-wrap gap-7">
        {articles.length === 0 ? (
          <p className="text-muted">لا توجد مقالات لعرضها</p>
        ) : (
          articles.map((e) => <ArticleItem article={e} key={e.id} />)
        )}
      </div>
    </section>
  );
};

export default Page;
