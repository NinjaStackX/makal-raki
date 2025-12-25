// app/search-dashboard/layout.tsx

interface LayoutProps {
  children: React.ReactNode; // لـ page.tsx الأساسية
  comments: React.ReactNode; // لـ @users
  // لـ @articles
}

export default function ArticleLayout(children, comments }: LayoutProps) {
  return (
    <main className="min-h-screen bg-white p-6">
      {/* 1. المحتوى الأساسي */}
      <section className="mb-10">{children}</section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 2. فتحة المستخدمين */}
        <section className="border-2 border-blue-100 rounded-3xl p-4">
          <h2 className="text-blue-600 font-bold mb-4">قائمة المستخدمين</h2>
          {comments}
        </section>


      </div>
    </main>
  );
}
