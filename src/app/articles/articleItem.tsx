// components/Articles/ArticleItem.tsx
import { Article } from "@/utils/types";
import Link from "next/link";

interface ArticleItemsProps {
  article: Article;
}

const ArticleItem = ({ article }: ArticleItemsProps) => {
  const { title, body, id } = article;

  return (
    <div className="group bg-white p-6 rounded-[2rem] border border-zinc-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50/50 transition-all duration-300 flex flex-col justify-between w-full md:w-[48%] lg:w-[31%] min-h-[250px]">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
            مقال جديد
          </span>
        </div>

        <h1 className="text-xl font-black text-zinc-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-3">
          {title}
        </h1>

        <p className="text-zinc-500 text-sm line-clamp-3 leading-relaxed mb-6 italic">
          {body || "لا يوجد وصف متوفر لهذا المقال..."}
        </p>
      </div>

      <Link
        href={`/articles/${id}`}
        className="w-full py-4 bg-zinc-50 group-hover:bg-blue-600 text-zinc-900 group-hover:text-white text-center font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-inner"
      >
        اقرأ المقال
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
      </Link>
    </div>
  );
};

export default ArticleItem;
