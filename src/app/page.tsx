// app/page.tsx
import Hero from "@/components/Home/Hero";
import { fetchArticles } from "@/serverActions/article";
import { PenTool, MessageSquare, Newspaper } from "lucide-react";
import ArticleItem from "./articles/articleItem";

const HomePage = async () => {
  const articles = await fetchArticles();
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

      {/* هنا يمكنك وضع قائمة بأحدث المقالات بدلاً من Plans */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-black text-zinc-900 mb-6">
          أحدث الأطروحات
        </h2>
        {articles.map((a) => (
          <ArticleItem key={a.id} article={a} />
        ))}
      </section>
    </div>
  );
};

export default HomePage;
