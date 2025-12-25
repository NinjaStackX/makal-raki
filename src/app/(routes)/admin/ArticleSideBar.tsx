"use client";
import React from "react";
import { ArticleItem } from "./UserDataExplorer";
import useDialog from "@/hooks/useDialog";
import { FormArticle } from "./Forms";
import { createArticle } from "@/serverActions/article";

const ArticleSideBar = ({ articles, UpdateArticleDialog }: any) => {
  return (
    <div className="flex flex-row overflow-x-auto lg:flex-col lg:overflow-visible gap-4 p-4">
      {articles.map((a: any) => (
        <section
          key={a.id}
          className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 
                 flex-shrink-0 min-w-[280px] lg:min-w-full"
        >
          <ArticleItem
            article={a}
            userId={a.authorId}
            showAuthor={true}
            author={a.author.name}
            edit={UpdateArticleDialog.setItem}
            handleClose={UpdateArticleDialog.toggleDialog}
          />
        </section>
      ))}
    </div>
  );
};

export default ArticleSideBar;
