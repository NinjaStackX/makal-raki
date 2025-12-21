import { prisma } from "@/lib/prisma";
import { useUser } from "@/lib/useUser";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";

import React from "react";
import Dashboard from "./Dashboard";

const page = async () => {
  const { user } = await useUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/");
  }
  const users = await prisma.user.findMany();
  const comments = await prisma.comment.findMany();
  const posts = await prisma.article.findMany();

  return <Dashboard users={users} comments={comments} posts={posts} />;
};

export default page;
