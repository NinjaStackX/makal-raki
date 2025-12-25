"use client";
import { motion } from "motion/react";

export default function ArticleContent({ article }: any) {
  const { title, body, author, createdAt } = article;

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm"
    >
      <h1 className="text-4xl font-black text-zinc-900 mb-6 leading-tight">
        {title}
      </h1>

      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-zinc-100">
        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl uppercase">
          {author?.name?.[0] || "A"}
        </div>
        <div>
          <p className="text-zinc-900 font-bold tracking-tight">
            <span className="text-zinc-400 font-normal">By </span>
            {author?.name || "Anonymous"}
          </p>
          <p className="text-zinc-400 text-xs">
            {new Date(createdAt).toLocaleDateString("ar-EG", {
              dateStyle: "long",
            })}
          </p>
        </div>
      </div>

      <div className="prose prose-zinc max-w-none text-zinc-600 leading-relaxed text-lg">
        {body || "لا يوجد محتوى لهذا المقال حالياً."}
      </div>
    </motion.article>
  );
}
