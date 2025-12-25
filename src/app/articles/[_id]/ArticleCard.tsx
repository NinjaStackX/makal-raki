"use client";
import React from "react";
import { motion } from "motion/react";

const ArticleContent = ({ article }: any) => {
  const { title, body, author, createdAt } = article;
  return (
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
        <motion.div key={`${author}-${createdAt}`}>
          <span className="author">By </span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            exit={{ opacity: 0 }}
          >
            {author.name || "..."}
          </motion.span>
        </motion.div>

        <span className="date">{JSON.stringify(createdAt)}</span>
      </motion.div>
    </div>
  );
};

export default ArticleContent;
