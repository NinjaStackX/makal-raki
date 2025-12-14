const Page = () => {
  return (
    <section className="m-5">
      <div className="flex items-center justify-center flex-wrap gap-7">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="p-5 rounded-lg shadow-lg border-2 border-gray-300 w-[100px] md:w-2/5 lg:w-1/4 animate-pulse"
          >
            {/* Title */}
            <div className="h-5 bg-gray-300 rounded w-3/4 mb-4"></div>

            {/* Paragraph */}
            <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>

            {/* Button */}
            <div className="h-10 bg-gray-300 rounded w-full"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Page;
