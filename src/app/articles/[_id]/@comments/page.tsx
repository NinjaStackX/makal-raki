import { fetchComments } from "@/serverActions/comments";
import React from "react";

const page = async () => {
  const comments = await fetchComments();
  return (
    <div>
      {/* {comments.map((c) => (
        <>{c.content}</>
      ))} */}
      hi
    </div>
  );
};

export default page;
