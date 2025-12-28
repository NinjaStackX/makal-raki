"use client";
import React from "react";
import { ArticleItem } from "./UserDataExplorer";
import { Article, Dialog } from "@/utils/types";

interface ArticleSideBarProps {
  articles: Article[];
  UpdateArticleDialog: Dialog;
}
const ArticleSideBar = ({
  articles,
  UpdateArticleDialog,
}: ArticleSideBarProps) => {
  return (
    <div className="flex flex-row overflow-x-auto lg:flex-col lg:overflow-visible gap-4 p-4">
      {articles.map((a) => (
        <section
          key={a.id}
          className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 
                 flex-shrink-0 min-w-[280px] lg:min-w-full"
        >
          <ArticleItem
            article={a}
            userId={String(a.authorId)}
            showAuthor={true}
            author={a.author.name}
            edit={UpdateArticleDialog?.setItem}
            handleClose={UpdateArticleDialog?.toggleDialog}
          />
        </section>
      ))}
    </div>
  );
};

export default ArticleSideBar;
