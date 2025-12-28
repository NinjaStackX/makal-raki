// app/page.tsx
import Hero from "@/components/Home/Hero";
import { fetchArticles } from "@/serverActions/article";
import { PenTool, MessageSquare, Newspaper } from "lucide-react";
import ArticleItem from "./(routes)/articles/articleItem";
import Pagination from "@/components/Pagination"; // سننشئ هذا المكون بالأسفل
import { Article } from "@/utils/types";

export const dynamic = "force-dynamic";

export default async function HomePage({}: {}) {
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
    </div>
  );
}
