import { pr } from "@/lib/pr";
import { Article, User } from "@/utils/types";
import { useState } from "react";
import { toast } from "react-toastify";

interface Form {
  action: () => { ok: boolean };
  handleClose: () => void;
  user?: User;
  article?: Article;
}

export function FormArticle({ action, article, handleClose }: Form) {
  pr(article);
  const [loading, setLoading] = useState(false);
  const articleId = article?.id;
  const authorId = article?.authorId;
  const titDialog = articleId ? "تعديل مقال" : "انشاء مقال";
  function handleAction(e: React.FormEvent<HTMLFormElement>) {
    async function handleSubmit() {
      setLoading(true);
      pr(e);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        await action(e);

        handleClose();
      } catch (error) {
        console.error("خطأ في الإرسال:", error);
      } finally {
        setLoading(false);
      }
    }
    handleSubmit();
  }
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <button onClick={handleClose}>X</button>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{titDialog}</h2>
      <form action={handleAction} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            العنوان
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="أدخل عنوان المقال"
            name="title"
            defaultValue={article?.title}
          ></input>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            المحتوى
          </label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="اكتب محتوى المقال هنا..."
            name="body"
            rows={4}
            defaultValue={article?.body}
          ></textarea>
        </div>

        <label className="flex items-center gap-2 mt-5 cursor-pointer">
          <input
            type="checkbox"
            name="published"
            className="w-4 h-4 text-blue-600 rounded"
            defaultChecked={article?.published}
          />
          <span className="text-sm text-gray-600">نشر الآن</span>
        </label>
        {authorId && <input type="hidden" name="authorId" value={authorId} />}
        {articleId && <input type="hidden" name="id" value={articleId} />}

        <button
          type="submit"
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          {loading && "Loading......."}
          {!loading && !article?.id && " إنشاء المقال"}
          {!loading && article?.id && " تعديل المقال"}
        </button>
      </form>
    </div>
  );
}

export function FormUser({ action, handleClose, user }: Form) {
  const [loading, setLoading] = useState<boolean>(false);
  pr(user);

  const userId = user?.id;
  const titDialog = userId ? "تعديل بيانات لمستخدم" : "انشاء  مستخدم جديد";
  const detailsDialog = userId
    ? "  ملاحظة: انرك الحقل فارغ اذا لم تكن ترغب تعديله"
    : "قم بملء البيانات ";

  function handleAction(e: React.FormEvent<HTMLFormElement>) {
    async function handleSubmit() {
      setLoading(true);
      pr(e);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const status = await action(e);
        if (status.ok) toast.success("completed user Submition Succeffully");
        handleClose();
      } catch (error) {
        console.error("خطأ في الإرسال:", error);
      } finally {
        setLoading(false);
      }
    }
    handleSubmit();
  }
  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white shadow-2xl rounded-2xl">
      <button onClick={handleClose}>X</button>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">{titDialog}</h2>
        <p className="text-gray-500 mt-2">{detailsDialog}</p>
      </div>
      <form action={handleAction} className="space-y-5">
        <div>
          <input
            type="text"
            className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition"
            placeholder="الاسم الكامل"
            name="name"
          />
        </div>
        <div>
          <input
            type="email"
            className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition"
            placeholder="البريد الإلكتروني"
            name="email"
          />
        </div>
        <div>
          <input
            type="password"
            className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition"
            placeholder="كلمة المرور"
            name="password"
          />
          {userId && <input type="hidden" name="id" value={userId} />}
          {userId && (
            <select name="role" defaultValue={user.role}>
              <option value="">القيمة الافتراضية لدور المستخدم</option>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-200 transition duration-300"
        >
          {loading && "Loading......."}
          {!loading && !user?.id && " إنشاء مستخدم جديد"}
          {!loading && user?.id && " تعديل تفاصيل المستخدم"}
        </button>
      </form>
    </div>
  );
}
