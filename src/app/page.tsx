// app/page.tsx
import Hero from "@/components/Home/Hero";
import { fetchArticles } from "@/serverActions/article";
import { PenTool, MessageSquare, Newspaper } from "lucide-react";
import ArticleItem from "./(routes)/articles/articleItem";
import Pagination from "@/components/Pagination"; // سننشئ هذا المكون بالأسفل
import { Article } from "@/utils/types";

export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  articles: Article[];
  searchParams: { page?: string };
}) {
  const articles = await fetchArticles();
  const currentPage = Number(searchParams?.page) || 1;
  const itemsPerPage = 6; // عدد المقالات في كل صفحة

  // حساب المقالات التي ستظهر في الصفحة الحالية
  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const displayedArticles = articles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col gap-10">
      <Hero title={"مقال ورأي"}>
        <p className="text-zinc-600 text-lg">
          المنصة العربية الرائدة لنشر المقالات ومناقشة الأفكار بكل حرية
        </p>
        <br />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2 text-zinc-700 font-bold bg-white/50 p-3 rounded-2xl border border-blue-50">
            <PenTool className="text-blue-600" /> أنشئ مقالاتك
          </div>
          <div className="flex items-center gap-2 text-zinc-700 font-bold bg-white/50 p-3 rounded-2xl border border-blue-50">
            <MessageSquare className="text-blue-600" /> تفاعل مع المجتمع
          </div>
          <div className="flex items-center gap-2 text-zinc-700 font-bold bg-white/50 p-3 rounded-2xl border border-blue-50">
            <Newspaper className="text-blue-600" /> محتوى متجدد يومياً
          </div>
        </div>
      </Hero>

      <section className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-black text-zinc-900 mb-6">
          أحدث الأطروحات
        </h2>

        {/* عرض المقالات في شبكة (Grid) بدلاً من الصف العرضي */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-1">
          {displayedArticles.map((a) => (
            <div className="w-[1300px] ">
              <ArticleItem key={a.id} article={a} />
            </div>
          ))}
        </div>

        {/* مكون أزرار التنقل */}
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </section>
    </div>
  );
}
