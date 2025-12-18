import Image from "next/image";
import type { ReactNode } from "react";
import CloudImage from "@/../public/cloud.png"; // عدّل المسار حسب مشروعك

type Props = {
  title: string | ReactNode;
  children?: ReactNode;
  imageAlt?: string;
  imagePriority?: boolean;
};

export default function HeroSection({
  title,
  children,
  imageAlt = "Cloud illustration",
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
        <div className="relative w-72 h-72 sm:w-96 sm:h-96">
          <Image
            src={CloudImage}
            alt={imageAlt}
            fill={false}
            width={500}
            height={500}
            priority={imagePriority}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
