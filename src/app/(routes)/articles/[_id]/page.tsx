import React from "react";
import "./styles.css";
import ArticleContent from "./ArticleContent";
import ArticleMeta from "./ArticleMeta";
import { getArticleById, getAuthorNameByUserId } from "@/lib/articles";

export default async function Page({
  params,
}: {
  params: Promise<{ _id: string }>;
}) {
  const { _id } = await params;
  const article = await getArticleById(_id);
  const author = await getAuthorNameByUserId(article?.userId);
  const title = article?.title || "Default Title";
  const body = article?.body || "Default body content.";
  const publishedAt = new Date().toLocaleDateString();
  return (
    <div className="fix-height flex items-center justify-center p-4">
      <div>
        <ArticleContent title={title} body={body} />
        <ArticleMeta author={author || "..."} publishedAt={publishedAt} />
      </div>
    </div>
  );
}
