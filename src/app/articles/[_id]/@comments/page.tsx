// app/article/[_id]/@comments/page.tsx

import { fetchCommentsByArticleId } from "@/serverActions/comments";
import React from "react";

export default async function CommentsPage({
  params,
}: {
  params: Promise<{ _id: string }>;
}) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const { _id } = await params;
  const comments = await fetchCommentsByArticleId(_id);

  return (
    <div className="flex flex-col gap-4">
      {/* Header الصغير */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-zinc-900 font-black text-sm tracking-tight uppercase">
          التعليقات <span className="text-blue-600">({comments.length})</span>
        </h3>
      </div>

      {comments.length > 0 ? (
        <div className="space-y-3">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white border border-zinc-100 p-4 rounded-2xl hover:border-blue-100 hover:shadow-sm transition-all"
            >
              {/* بيانات المستخدم */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold shadow-md shadow-blue-100">
                  {comment.user?.name?.[0] || "U"}
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-800">
                    {comment.user?.name || "مستخدم مجهول"}
                  </p>
                  <p className="text-[10px] text-zinc-400">منذ قليل</p>
                </div>
              </div>

              {/* محتوى التعليق */}
              <div className="pl-11">
                <p className="text-sm text-zinc-600 leading-relaxed italic">
                  "{comment.content}"
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center rounded-3xl border-2 border-dashed border-zinc-50">
          <p className="text-zinc-400 text-xs italic">
            لا توجد مناقشات بعد على هذا المقال.
          </p>
        </div>
      )}
    </div>
  );
}
