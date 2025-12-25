"use client";
import { motion, AnimatePresence } from "motion/react";
import { useState, useTransition } from "react";
import {
  User,
  BookOpen,
  MessageCircle,
  ChevronDown,
  Mail,
  ShieldCheck,
  Trash2,
  Loader2,
  X,
  Edit,
  PlusCircle,
  Menu,
  ArrowRight,
  LayoutGrid,
  Plus,
  Edit3,
  Search,
  Download,
} from "lucide-react";

import { createComment } from "@/serverActions/comments"; // استيراد الأكشن الجديد

// استيراد الأكشنز
import { createArticle, deleteArticle } from "@/serverActions/article";
import { deleteUser } from "@/serverActions/user";
import { deleteComment } from "@/serverActions/comments";
import { FormArticle } from "./Forms";
import useDialog from "@/hooks/useDialog";
import { pr } from "@/lib/pr";

export default function UserDataExplorer({
  users,
  UpdateArticleDialog,
  CreateArticleDialog,
  UpdateUserDialog,
}: any) {
  return (
    <>
      <div className="mx-auto p-8 bg-gray-50 min-h-screen">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            إدارة المجتمع
          </h1>
          <p className="text-gray-500 mt-2">
            تحكم كامل بالمستخدمين، المقالات، والتعليقات
          </p>
        </header>

        <div className="grid gap-6">
          {users.map((user: any, index: any) => (
            <UserCard
              key={user.id}
              user={user}
              index={index}
              UpdateArticleDialog={UpdateArticleDialog}
              UpdateUserDialog={UpdateUserDialog}
              CreateArticleDialog={CreateArticleDialog}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function UserCard({
  user,
  index,
  UpdateArticleDialog,
  CreateArticleDialog,
  UpdateUserDialog,
}: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDeleteUser = () => {
    if (confirm("هل أنت متأكد من حذف هذا المستخدم وجميع بياناته؟")) {
      startTransition(async () => {
        await deleteUser(user.id);
      });
    }
  };
  const handleAddArticle = () => {
    pr(user.id);
    CreateArticleDialog.setItem({ authorId: user.id });
    CreateArticleDialog.setOpen(true);
  };
  const handleUpdateUser = () => {
    pr(user.id);
    UpdateUserDialog.setItem({ id: user.id });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-opacity ${
        isPending ? "opacity-50 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="p-6 flex items-center justify-between">
        {/* معلومات المستخدم وقابلة للضغط للفتح */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-4 cursor-pointer flex-1"
        >
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg">
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <User size={28} />
              )}
            </div>
            {user.role === "ADMIN" && (
              <div className="absolute -top-1 -right-1 bg-yellow-400 text-white p-1 rounded-full shadow-sm">
                <ShieldCheck size={14} />
              </div>
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              {user.name || "مستخدم مجهول"}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Mail size={14} /> {user.email}
            </div>
          </div>
        </div>

        {/* أزرار الإحصائيات والحذف */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex gap-4 px-4 border-r border-l mx-4">
            <Stat
              label="مقالات"
              count={user.articles?.length}
              color="text-blue-600"
            />
            <Stat
              label="تعليقات"
              count={user.comments?.length}
              color="text-green-600"
            />
          </div>

          <button
            onClick={handleDeleteUser}
            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
          >
            <Trash2 size={20} />
          </button>
          <button
            onClick={handleAddArticle}
            className="p-2 text-green-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-all"
          >
            <Plus size={20} />
          </button>
          <button
            onClick={handleUpdateUser}
            className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
          >
            <Edit3 size={20} />
          </button>

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer p-2"
          >
            <ChevronDown className="text-gray-400" />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-gray-100 bg-gray-50/50"
          >
            <div className="p-6 space-y-6">
              <h4 className="flex items-center gap-2 font-bold text-gray-700">
                <BookOpen size={18} className="text-blue-500" /> مقالات المستخدم
              </h4>

              <div className="grid gap-4">
                {user.articles?.map((article: any, i: any) => (
                  <ArticleItem
                    key={article.id}
                    article={article}
                    userId={user.id} // نمرر معرف المستخدم هنا
                    edit={UpdateArticleDialog.setItem}
                    handleClose={UpdateArticleDialog.toggleDialog}
                  />
                ))}
                {user.articles?.length === 0 && (
                  <p className="text-sm text-gray-400 italic">
                    لا توجد مقالات.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ArticleItem({
  article,
  userId,
  showAuthor = false,
  author = null,
  edit = () => {},
}: any) {
  // أضفنا userId كـ prop
  const [isDeleting, startTransition] = useTransition();
  const [isAdding, startAdding] = useTransition();

  const handleAddComment = (formData: any) => {
    startAdding(async () => {
      await createComment(formData);
    });
  };

  return (
    <div
      className={`bg-white p-4 rounded-xl border border-gray-200 shadow-sm transition-all ${
        isDeleting ? "scale-95 opacity-50" : ""
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h5 className="font-bold text-gray-800">{article.title}</h5>
        <div className="flex gap-3.5">
          <button
            disabled={isDeleting}
            onClick={() =>
              confirm("حذف المقال؟") &&
              startTransition(() => deleteArticle(article.id))
            }
            className="text-red-400 hover:text-red-600 p-1"
          >
            {isDeleting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Trash2 size={16} />
            )}
          </button>
          <button
            onClick={() => edit(article)}
            className="flex items-center gap-2 px-4 py-2.5 text-gray-700 bg-white border border-gray-200 hover:border-blue-400 hover:text-blue-600 rounded-xl transition-all font-medium text-sm"
          >
            <Edit3 className="w-4 h-4" />
            تعديل
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">{article.body}</p>
      {/* نموذج إضافة تعليق سريع */}
      <form action={handleAddComment} className="flex gap-2 mb-4">
        <input type="hidden" name="articleId" value={article.id} />
        <input type="hidden" name="userId" value={userId} />
        <input
          name="content"
          placeholder="اكتب تعليقاً..."
          required
          className="flex-1 text-xs border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-400 transition"
        />
        <button
          disabled={isAdding}
          className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold hover:bg-blue-100 disabled:opacity-50"
        >
          {isAdding ? "..." : "نشر"}
        </button>
      </form>
      {/* قائمة التعليقات */}
      <div className="space-y-2 border-t border-gray-50 pt-3">
        {article.comments?.map((comment: any) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
      {showAuthor && (
        <div className="text-right ">
          كتبت بواسطة : <span className="font-extrabold">{author}</span>
        </div>
      )}
    </div>
  );
}

// مكون فرعي للتعليق
function CommentItem({ comment }: any) {
  const [isDeleting, startTransition] = useTransition();

  return (
    <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg group">
      <p className="text-xs text-gray-700 italic">"{comment.content}"</p>
      <button
        onClick={() => startTransition(() => deleteComment(comment.id))}
        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all"
      >
        <Trash2 size={12} />
      </button>
    </div>
  );
}

function Stat({ label, count, color }: any) {
  return (
    <div className="text-center">
      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
        {label}
      </p>
      <p className={`text-lg font-bold ${color}`}>{count || 0}</p>
    </div>
  );
}

export const ActionsBar = ({ Dialog }: any) => {
  return (
    <div className="w-full  mx-auto my-6">
      {/* Container الأساسي */}
      <div className="bg-white/80 backdrop-blur-xl border border-gray-200 p-4 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* جهة اليمين: البحث */}
        <div className="relative w-full md:w-128">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="ابحث هنا..."
            className="w-full pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
          />
        </div>

        {/* جهة اليسار: الأزرار الاحترافية */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          {/* زر الحذف - طابع تحذيري */}

          {/* زر التعديل - طابع هادئ */}

          {/* الفاصل */}
          <div className="w-[1px] h-8 bg-gray-200 mx-1 hidden md:block"></div>

          {/* زر الإضافة - الزر الأساسي (Primary) */}
          <button
            onClick={() => {
              Dialog.setOpen(true);
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-200 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            إضافة مستخدم جديد
          </button>
        </div>
      </div>
    </div>
  );
};
