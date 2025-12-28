import Link from "next/link";

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  return (
    <div className="flex justify-center items-center gap-4 mt-10">
      {currentPage > 1 && (
        <Link
          href={`?page=${currentPage - 1}`}
          className="px-4 py-2 bg-zinc-100 rounded-md hover:bg-zinc-200 transition"
        >
          السابق
        </Link>
      )}

      <span className="text-sm font-medium">
        صفحة {currentPage} من {totalPages}
      </span>

      {currentPage < totalPages && (
        <Link
          href={`?page=${currentPage + 1}`}
          className="px-4 py-2 bg-zinc-900 text-white rounded-md hover:bg-zinc-800 transition"
        >
          التالي
        </Link>
      )}
    </div>
  );
}
