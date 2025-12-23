import { pr } from "@/lib/pr";
import { createArticle, fetchArticles } from "@/serverActions/article";
import { createComment, fetchComments } from "@/serverActions/comments";
import { createUser, fetchUsers } from "@/serverActions/user";
import React from "react";

const page = async () => {
  const articles = await fetchArticles();
  const comments = await fetchComments();
  const users = await fetchUsers();
  pr(articles);
  return (
    <>
      <AddArticle />
    </>
  );
};

export default page;

function AddArticle() {
  return (
    <>
      <form action={createArticle}>
        <input placeholder="title" name="title" />
        <input placeholder="body" name="body" />
        <input type="checkbox" name="published" />
        <input type="number" name="authorId" />
        <button type="submit">Create</button>
      </form>
    </>
  );
}
function AddUser() {
  return (
    <>
      <form action={createUser}>
        <input placeholder="name" name="name" />
        <input placeholder="email" name="email" />
        <input placeholder="password" name="password" />
        <button type="submit">Create</button>
      </form>
    </>
  );
}
