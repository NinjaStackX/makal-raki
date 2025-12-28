// app/article/[_id]/page.tsx
import ArticleContent from "./ArticleCard";
import { getArticleById } from "@/serverActions/article";

export default async function Page({
  params,
}: {
  params: Promise<{ _id: string }>;
}) {
  const { _id } = await params;
  const article = await getArticleById(_id);

  if (!article) return <div className="text-center p-10">المقال غير موجود</div>;

  return (
    <div className="flex flex-col gap-6">
      <ArticleContent article={article} />
    </div>
  );
}
