export default function LoadingComments() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="h-4 w-24 bg-zinc-200 rounded mb-2"></div> {/* العنوان */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white border border-zinc-100 p-4 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-zinc-200"></div>{" "}
            {/* الصورة */}
            <div className="space-y-2">
              <div className="h-3 w-20 bg-zinc-200 rounded"></div> {/* الاسم */}
              <div className="h-2 w-12 bg-zinc-100 rounded"></div> {/* الوقت */}
            </div>
          </div>
          <div className="pl-11">
            <div className="h-3 w-full bg-zinc-100 rounded mb-2"></div>
            <div className="h-3 w-2/3 bg-zinc-100 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
