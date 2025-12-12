import { Plan } from "@/utils/types";
// import { log } from "node:console";
// import { TiTick } from "react-icons/ti";
// import { VscError } from "react-icons/vsc";
const Features = [
  "100 Website",
  " 100 GB SSD Storage",
  " Weekly Backups",
  "Unlimited Bandwidth",
  "Free SLL",
  "Free Email",
];
const WebHostingPlan = ({ status, price }: Plan) => {
  return (
    <div className="flex flex-col items-center justify-center w-3/4 rounded p-4 bg-gray-200 mb-7 md:w-2/4 lg:w-1/4">
      <h3 className="text-3xl font-bold text-purple-900">{status}</h3>
      <strong className="text-3xl font-bold text-gray-900 my-5">
        {price.toString()}/mo
      </strong>
      <span className="bg-red-200 text-red-900 rounded-full px-2 py-1 font-semibold">
        10% OFF
      </span>
      <div className="mt-6">
        <h5 className="text-2xl mb-1 font-semibold text-purple-700">
          Top Features
        </h5>

        {Features.map((item, index) => {
          const val: Number = status == "Free" ? 2 : status == "Plus" ? 4 : 6;
          //   console.log(val);
          const x = index;

          if (Number(val) > Number(x)) {
            return (
              <div
                key={index}
                className="flex items-center text-green-700 mb-1 ps-3"
              >
                {/* <TiTick /> */}
                {item}
              </div>
            );
          } else
            return (
              <div
                key={index}
                className="flex items-center text-gray-700 mb-1 ps-3"
              >
                {/* <VscError /> */}
                {item}
              </div>
            );
        })}
      </div>
      <button className="mt-4 border-2 border-gray-900 text-gray-900 text-2xl font-bold p-1 rounded-full hover:text-white hover:bg-gray-900 transition w-full">
        BUY NOW
      </button>
    </div>
  );
};

export default WebHostingPlan;
