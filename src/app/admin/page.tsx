import { prisma } from "@/lib/prisma";
import { useUser } from "@/lib/useUser";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const { user } = await useUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/");
  }
  const users = await prisma.user.findMany();
  const comments = await prisma.comment.findMany();
  const posts = await prisma.article.findMany();
  return (
    <>
      Users:
      {users?.map((usr) => (
        <div key={usr.id}>
          <h2>{usr.name}</h2>
          <p>{usr.email}</p>
          <hr />
        </div>
      ))}
      <div className="bg-blue-300 rounded-2xl flex justify-center items-center gap-2.5 p-1.5 m-2">
        <h3>Total Comments: {comments.length}</h3>|
        <h3>Total Posts: {posts.length}</h3>
      </div>
    </>
  );
};

export default page;
