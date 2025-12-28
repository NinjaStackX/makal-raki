// app/article/[_id]/layout.tsx
export default function ArticleLayout({
  children,
  comments,
}: {
  children: React.ReactNode;
  comments: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-zinc-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* المحتوى الأساسي (المقال) - يأخذ مساحة أكبر */}
        <section className="lg:col-span-2">{children}</section>

        {/* المسار المتوازي (التعليقات) */}
        <section className="lg:col-span-1 bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden h-fit">
          <div className="bg-blue-600 p-4 text-white font-bold">
            التعليقات والمناقشة
          </div>
          <div className="p-4">{comments}</div>
        </section>
      </div>
    </main>
  );
}
