import Hero from "@/components/Home/Hero";
import Plans from "@/components/Home/Plans";
// import { TiTick } from "react-icons/ti";

const HomePage = () => {
  return (
    <div className="flex-col items-center">
      <Hero title={"Cloud Hosting"}>
        <p>The best web hosting solution for your online success</p>
        <br />
        <div>
          <div className="flex">
            {/* <TiTick /> Easy To Use Control Panel */}
          </div>
          <div className="flex">{/* <TiTick /> Secure Hosting */}</div>
          <div className="flex">{/* <TiTick /> Website Maintenance */}</div>
        </div>
      </Hero>
      <Plans />
    </div>
  );
};

export default HomePage;
