"use client";

import React from "react";
import { AnimatePresence, motion } from "motion/react";
import "./styles.css";
import { useSearchParams } from "next/navigation";

type Props = {
  params?: {
    id?: string;
  };
  publishedAt?: string;
};

export default function SinglePageItem({ publishedAt = "2025-01-14" }: Props) {
  const params = useSearchParams();
  const title = params?.get("title") ?? "";
  const authorId = params?.get("author") ?? "";
  const body = params?.get("body") ?? "";

  const [author, setAuthor] = React.useState<string>("");

  React.useEffect(() => {
    async function fetchAuthor() {
      if (!authorId) return;
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${authorId}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setAuthor(data.name ?? "");
      } catch (error) {
        console.error("Error fetching author:", error);
        setAuthor("");
      }
    }
    setTimeout(() => {
      fetchAuthor();
    }, 5000);
  }, []);

  return (
    <div className="fix-height flex items-center justify-center p-4">
      <div>
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="article-card w-[75vw] h-[40vh] p-6"
        >
          <h2 className="title">{title}</h2>
          {body && <p className="body">{body}</p>}
        </motion.article>

        <motion.div
          className="meta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.div key={`${author}-${publishedAt}`}>
            <span className="author">By </span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              exit={{ opacity: 0 }}
            >
              {author || "..."}
            </motion.span>
          </motion.div>

          <span className="date">{publishedAt}</span>
        </motion.div>
      </div>
    </div>
  );
}
