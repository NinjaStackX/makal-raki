import { fetchArticles } from "@/serverActions/article";

import { fetchUsers } from "@/serverActions/user";
import React from "react";

import DashBoard from "./DashBoard";

const page = async () => {
  const users = await fetchUsers();
  const articles = await fetchArticles();

  return (
    <main className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto">
        <DashBoard users={users} articles={articles} />
      </div>
    </main>
  );
};

export default page;
