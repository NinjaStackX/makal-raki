import React from "react";
import CloudImage from "@/../public/cloud-hosting.png";
import Image from "next/image";

const Hero = ({ children, title }) => {
  return (
    <section className="justify-around md:flex lg:flex ">
      <div
        style={{ width: "500px" }}
        className="bg-gray-200 m-auto p-8 rounded-3xl "
      >
        <h1 className="text-5xl flex font-bold">{title}</h1>
        <div className="my-12">{children}</div>
      </div>
      <div className="ccenter">
        <Image src={CloudImage} alt="cloud" width={500} height={500} />
      </div>
    </section>
  );
};

export default Hero;
