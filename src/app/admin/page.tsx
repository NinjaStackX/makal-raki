import { prisma } from "@/lib/prisma";
import { useUser } from "@/lib/useUser";
import { redirect } from "next/navigation";
import React from "react";
import Btn from "./Btn";

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
      <div className="bg-fuchsia-800 rounded-2xl flex-col justify-center items-center gap-2.5 p-1.5 m-2">
        <div className="text-center m-1.5  text-white">
          Users:
          <hr />
        </div>
        <div className="grid gap-3 justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {users?.map((usr) => (
            <div key={usr.id} className="bg-amber-500 p-5 rounded-2xl">
              username: <span className="font-bold">{usr.name}</span>
              <br />
              email: <span className="font-bold">{usr.email}</span>
              <br />
              <Btn typ="user" id={usr.id} />
            </div>
          ))}
        </div>
      </div>
      <div className="bg-blue-300 rounded-2xl flex-col justify-center items-center gap-2.5 p-1.5 m-2">
        <div className=" flex justify-center gap-5 text-center m-1.5">
          <h3>Total Comments: {comments.length}</h3>|
          <h5>Total Posts: {posts.length}</h5>
        </div>
        <div className="grid gap-3 justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {" "}
          {posts?.map((pt) => (
            <div key={pt.id} className="bg-amber-500 p-5 rounded-2xl">
              <h2 className="font-bold">{pt.title}</h2>
              <hr />
              <br />
              <h4>{pt.body}</h4>
              <Btn typ="comment" id={pt.id} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
