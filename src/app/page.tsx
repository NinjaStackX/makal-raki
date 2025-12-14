import Hero from "@/components/Home/Hero";
import Plans from "@/components/Home/Plans";
import { prisma } from "@/lib/prisma";
import { CheckCheck } from "lucide-react";

const HomePage = () => {
  // async function main() {
  //   const user = await prisma.user.create({
  //     data: {
  //       name: "Alice",
  //       email: "alice@prisma.io",
  //     },
  //   });
  //   console.log(user);
  // }

  // // main()
  // //   .then(async () => {
  // //     await prisma.$disconnect();
  // //   })
  // //   .catch(async (e) => {
  // //     console.error(e);
  // //     await prisma.$disconnect();
  // //     process.exit(1);
  // //   });
  // async function second() {
  //   {
  //     const users = await prisma.user.findMany();
  //     console.log(users);
  //   }
  // }
  // second()
  //   .then(async () => {
  //     await prisma.$disconnect();
  //   })
  //   .catch(async (e) => {
  //     console.error(e);
  //     await prisma.$disconnect();
  //     process.exit(1);
  //   });
  return (
    <div className="flex-col items-center">
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
      <button>create</button>
    </div>
  );
};

export default HomePage;
