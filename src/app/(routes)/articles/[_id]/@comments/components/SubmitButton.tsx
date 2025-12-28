"use client";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`self-end px-8 py-2.5 font-bold rounded-xl transition-all text-sm shadow-lg
        ${
          pending
            ? "bg-zinc-100 text-zinc-400 cursor-not-allowed shadow-none"
            : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-blue-200"
        }`}
    >
      {pending ? (
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin"></div>
          جاري الإرسال...
        </div>
      ) : (
        "إرسال التعليق"
      )}
    </button>
  );
}
