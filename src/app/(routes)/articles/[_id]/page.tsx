import React from "react";
import "./styles.css";
import ArticleContent from "./ArticleCard";

import { getArticleById } from "@/serverActions/article";
import { pr } from "@/lib/pr";

export default async function Page({
  params,
}: {
  params: Promise<{ _id: string }>;
}) {
  const { _id } = await params;
  const article = await getArticleById(_id);
  pr(article);
  return (
    <div className="fix-height flex items-center justify-center p-4">
      <ArticleContent article={article} />
    </div>
  );
}
