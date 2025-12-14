"use client";
import React from "react";
import { motion } from "motion/react";

const ArticleMeta = ({
  author,
  publishedAt,
}: {
  author: string;
  publishedAt: string;
}) => {
  return (
    <>
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
    </>
  );
};

export default ArticleMeta;
