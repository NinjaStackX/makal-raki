"use client";
import {
  deleteArticle,
  getArticleById,
  updateArticleAction,
} from "@/serverActions/article";
import { Suspense, use, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

export default function ArticleActions({ id }: { id: number }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const confirmDelete = async () => {
    setIsDeleting(true);
    await deleteArticle(id);
    setIsDeleting(false);
  };

  return (
    <div className="flex gap-2">
      {isEditOpen && (
        <EditArticleModal articleId={id} onClose={() => setIsEditOpen(false)} />
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-[2rem] shadow-2xl border border-zinc-100 max-w-sm w-full text-center">
            <h3 className="text-xl font-black text-zinc-900 mb-2">
              حذف المقال؟
            </h3>
            <p className="text-zinc-500 text-sm mb-6">
              هل أنت متأكد؟ لا يمكن التراجع عن هذه العملية.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 bg-zinc-100 text-zinc-600 font-bold rounded-xl hover:bg-zinc-200 transition-all"
              >
                إلغاء
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-all shadow-lg shadow-red-100"
              >
                نعم، احذف
              </button>
            </div>
          </div>
        </div>
      )}
      {/* زر التعديل */}
      <button
        onClick={() => setIsEditOpen(true)}
        className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </button>
      {/* زر الحذف */}
      <button
        onClick={() => setShowModal(true)}
        disabled={isDeleting}
        className={`p-2 rounded-xl transition-colors ${
          isDeleting ? "text-zinc-300" : "text-red-500 hover:bg-red-50"
        }`}
      >
        {isDeleting ? (
          <div className="w-5 h-5 border-2 border-zinc-200 border-t-zinc-400 rounded-full animate-spin" />
        ) : (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

// مكون فرعي لجلب البيانات وعرض الفورم
function EditFormContent({
  articleId,
  onClose,
}: {
  articleId: any;
  onClose: () => void;
}) {
  // جلب البيانات مباشرة داخل الكومبوننت
  const [article, setArticle] = useState({});
  useEffect(() => {
    async function fetch() {
      const art = await getArticleById(Number(articleId));
      setArticle(art);
    }
    fetch();
  }, []);

  if (!article)
    return <div className="p-8 text-center text-red-500">المقال غير موجود</div>;

  return (
    <form
      action={async (formData) => {
        await updateArticleAction(formData);
        onClose();
      }}
      className="p-8 space-y-6"
    >
      <input type="hidden" name="id" defaultValue={article.id} />

      <div className="space-y-2 text-right">
        <label className="text-sm font-bold text-zinc-700 px-1">
          عنوان المقال
        </label>
        <input
          name="title"
          defaultValue={article.title}
          className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold text-right"
        />
      </div>

      <div className="space-y-2 text-right">
        <label className="text-sm font-bold text-zinc-700 px-1">المحتوى</label>
        <textarea
          name="body"
          defaultValue={article.body}
          rows={5}
          className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none text-right"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-4 bg-zinc-100 text-zinc-600 font-bold rounded-2xl hover:bg-zinc-200 transition-all"
        >
          إلغاء
        </button>
        <SubmitButton />
      </div>
    </form>
  );
}

// المكون الأساسي (المودال)
function EditArticleModal({
  articleId,
  onClose,
}: {
  articleId: any;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-blue-50 overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
          <h3 className="text-xl font-bold">تعديل المقال</h3>
          <button
            onClick={onClose}
            className="hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* عرض حالة التحميل ريثما تجهز البيانات */}
        <Suspense
          fallback={
            <div className="p-20 flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="text-zinc-400 text-sm font-bold">
                جاري جلب البيانات...
              </p>
            </div>
          }
        >
          <EditFormContent articleId={articleId} onClose={onClose} />
        </Suspense>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 active:scale-95 transition-all disabled:opacity-50"
    >
      {pending ? "جاري الحفظ..." : "حفظ التغييرات"}
    </button>
  );
}
