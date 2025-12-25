import { pr } from "@/lib/pr";
import { createArticle, fetchArticles } from "@/serverActions/article";
import { createComment, fetchComments } from "@/serverActions/comments";
import { createUser, fetchUsers } from "@/serverActions/user";
import React from "react";
import UserDataExplorer, { ActionsBar, ArticleItem } from "./UserDataExplorer";
import { FormUser, FormArticle } from "./Forms";
import ArticleSideBar from "./ArticleSideBar";
import DashBoard from "./DashBoard";

const page = async () => {
  const users = await fetchUsers();
  const articles = await fetchArticles();
  pr(articles);
  return (
    <main className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto">
        <DashBoard users={users} articles={articles} />
      </div>
    </main>
  );
};

export default page;
