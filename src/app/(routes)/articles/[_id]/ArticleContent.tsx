"use client";
import React from "react";
import { AnimatePresence, motion } from "motion/react";

const ArticleContent = ({ title, body }: { title: String; body: String }) => {
  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="article-card w-[75vw] h-[40vh] p-6"
      >
        <h2 className="title">{title}</h2>
        {body && <p className="body">{body}</p>}
      </motion.article>
    </>
  );
};

export default ArticleContent;
