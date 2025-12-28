export default function LoadingComments() {
  return (
    // استخدام flex-col ثابت لمنع أي تلاعب في العرض
    <div className="flex flex-col gap-4 w-full overflow-hidden">
      {/* العنوان - ثابت المكان */}
      <div className="px-1 mb-2">
        <div className="h-4 w-28 bg-zinc-200 rounded-md animate-pulse"></div>
      </div>

      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white border border-zinc-100 p-4 rounded-2xl min-h-[120px] flex flex-col justify-between"
        >
          {/* بيانات المستخدم - Header الهيكل */}
          <div className="flex items-center gap-3 mb-4">
            {/* الدائرة بنفس حجم الـ Avatar الحقيقي */}
            <div className="w-8 h-8 rounded-full bg-blue-50 animate-pulse shrink-0"></div>

            <div className="flex flex-col gap-2">
              {/* اسم المستخدم */}
              <div className="h-3 w-24 bg-zinc-100 rounded-full animate-pulse"></div>
              {/* الوقت */}
              <div className="h-2 w-12 bg-zinc-50 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* محتوى التعليق - الأسطر */}
          <div className="pl-11 space-y-2">
            <div className="h-3 w-full bg-zinc-50 rounded-full animate-pulse"></div>
            <div className="h-3 w-[85%] bg-zinc-50 rounded-full animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
