"use client";
import { useRef } from "react";
import { addCommentAction } from "@/serverActions/comments";
import { SubmitButton } from "./SubmitButton";

import Link from "next/link";
import { User } from "@/utils/types";

export default function CommentForm({
  articleId,
  user,
}: {
  articleId: string;
  user: User;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="w-full">
      {user ? (
        <form
          ref={formRef}
          action={async (formData) => {
            await addCommentAction(formData);
            formRef.current?.reset();
          }}
          className="p-5 bg-blue-50/40 rounded-[2rem] border border-blue-100/50 mb-8"
        >
          <input type="hidden" name="articleId" value={articleId} />

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 px-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <label className="text-xs font-bold text-blue-600 uppercase tracking-wider ">
                شاركنا رأيك يا {user.name}
              </label>
            </div>

            <textarea
              name="content"
              placeholder="اكتب تعليقك هنا بكل حرية..."
              required
              className="w-full p-4 rounded-2xl border border-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 outline-none transition-all resize-none text-sm text-zinc-700 placeholder:text-zinc-300 shadow-sm min-h-[100px]"
            />
            <SubmitButton />
          </div>
        </form>
      ) : (
        /* تصميم احترافي لحالة عدم تسجيل الدخول */
        <div className="p-6 bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-[2rem] text-center mb-8">
          <p className="text-zinc-500 text-sm font-medium">
            عذراً، يجب عليك{" "}
            <Link
              href="/auth"
              className="text-blue-600 font-bold cursor-pointer hover:underline"
            >
              تسجيل الدخول
            </Link>{" "}
            لتتمكن من إضافة تعليق.
          </p>
        </div>
      )}
    </div>
  );
}
