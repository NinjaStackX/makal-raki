import { getUserById } from "@/serverActions/user";
import { prisma } from "@/lib/prisma";
import { getServerData } from "@/serverActions/tools";
import ArticleActions from "./ArticleActions";

export default async function ProfilePage() {
  // 1. جلب الجلسة وفك التشفير (نستخدم userId: 11 كافتراضي بناءً على بياناتك)
  const session = await getServerData();
  const userId = session?.userId || 11;

  // 2. جلب بيانات المستخدم مع مقالاته وتعليقاته
  const userFullData = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      articles: {
        include: { _count: { select: { comments: true } } },
        orderBy: { createdAt: "desc" },
      },
      _count: { select: { articles: true, comments: true } },
    },
  });

  if (!userFullData)
    return <div className="p-20 text-center">المستخدم غير موجود</div>;

  return (
    <main className="min-h-screen bg-zinc-50/50 p-4 md:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header - بطاقة تعريف المستخدم */}
        <header className="bg-white border border-blue-50 rounded-[2.5rem] p-8 shadow-sm flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white text-4xl font-black shadow-xl shadow-blue-100">
            {userFullData.name[0].toUpperCase()}
          </div>
          <div className="flex-1 text-center md:text-right">
            <h1 className="text-3xl font-black text-zinc-900">
              {userFullData.name}
            </h1>
            <p className="text-zinc-400 font-medium">{userFullData.email}</p>
            <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-2">
              <span className="px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest">
                {userFullData.role}
              </span>
            </div>
          </div>

          {/* إحصائيات سريعة */}
          <div className="flex gap-4 border-t md:border-t-0 md:border-r border-zinc-100 pt-6 md:pt-0 md:pr-8">
            <div className="text-center">
              <p className="text-2xl font-black text-blue-600">
                {userFullData._count.articles}
              </p>
              <p className="text-[10px] text-zinc-400 font-bold uppercase">
                مقالة
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-zinc-800">
                {userFullData._count.comments}
              </p>
              <p className="text-[10px] text-zinc-400 font-bold uppercase">
                تعليق
              </p>
            </div>
          </div>
        </header>

        {/* قسم المقالات الخاصة بالمستخدم */}
        <section className="space-y-6">
          <h2 className="text-xl font-black text-zinc-900 flex items-center gap-3 px-2">
            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
            مقالاتي المنشورة
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {userFullData.articles.map((article) => (
              <div
                key={article.id}
                className="group relative bg-white border border-zinc-100 rounded-[2rem] p-6 hover:border-blue-200 transition-all shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-zinc-800 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <span className="text-[10px] text-zinc-400">
                    {new Date(article.createdAt).toLocaleDateString("ar-EG")}
                  </span>
                </div>
                <ArticleActions id={article.id} />
                <p className="text-zinc-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                  {article.body || "لا يوجد وصف مختصر لهذا المقال.."}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl text-xs font-bold">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                    {article._count.comments} تعليقات
                  </div>

                  <a
                    href={`/articles/${article.id}`}
                    className="text-xs font-bold text-zinc-400 hover:text-blue-600 transition-colors flex items-center gap-1"
                  >
                    عرض المقال كامل
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}

            {userFullData.articles.length === 0 && (
              <div className="bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-[2rem] p-20 text-center">
                <p className="text-zinc-400 font-medium">
                  لم تقم بنشر أي مقالات بعد.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
