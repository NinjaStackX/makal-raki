import Hero from "@/components/Home/Hero";
import Plans from "@/components/Home/Plans";

import { CheckCheck } from "lucide-react";

const HomePage = () => {
  return (
    <div className="flex-col justify-center items-center">
      <Hero title={"Cloud Hosting"}>
        <p>The best web hosting solution for your online success</p>
        <br />
        <div>
          <div className="flex">
            <CheckCheck /> Easy To Use Control Panel
          </div>
          <div className="flex">
            {" "}
            <CheckCheck /> Secure Hosting{" "}
          </div>
          <div className="flex">
            <CheckCheck /> Website Maintenance
          </div>
        </div>
      </Hero>
      <Plans />
    </div>
  );
};

export default HomePage;
