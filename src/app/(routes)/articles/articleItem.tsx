import { Article } from "@/utils/types";
import Link from "next/link";
interface ArticleItemsProps {
  article: Article;
}
const ArticleItem = ({ article }: ArticleItemsProps) => {
  return (
    <div className="w-100% p-5 rounded-lg shadow-lg border-2 border-gray-400 hover:bg-slate-200 w-full md:w-2/5 lg:w-1/4 ">
      <h1 className="text-xl font-bold text-gray-900 line-clamp-1">
        {article.title}
      </h1>

      <p className="my-2 text-xl p-1 line-clamp-1">{article.body}</p>

      <Link
        className="text-xl bg-purple-700 hover:bg-purple-800 w-full block text-center p-1 text-white rounded-lg"
        href={{
          pathname: `/articles/${article.id}`,
          query: {
            title: article.title,
            body: article.body,
            author: article.userId,
          },
        }}
      >
        Show Details
      </Link>
    </div>
  );
};

export default ArticleItem;
