import { PenTool } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
// import CloudImage from "@/../public/pen.png"; // عدّل المسار حسب مشروعك

type Props = {
  title: string | ReactNode;
  children?: ReactNode;
  imageAlt?: string;
  imagePriority?: boolean;
};

export default function HeroSection({
  title,
  children,

  imagePriority = false,
}: Props) {
  return (
    <section className="m-2.5 flex flex-col-reverse lg:flex-row items-center justify-between gap-8py-12 px-6">
      <div className="w-full lg:w-1/2 flex justify-center">
        <div className="bg-gray-200 p-8 rounded-3xl max-w-2xl w-full shadow-md">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            {title}
          </h1>
          <div className="my-8 text-gray-700">{children}</div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex justify-center">
        <div className="relative flex justify-center items-center w-72 h-72 sm:w-96 sm:h-96">
          {" "}
          <PenTool size={180} />
        </div>
      </div>
    </section>
  );
}
