import { useUser } from "@/lib/useUser";
import { redirect } from "next/navigation";
import DashBoard from "./DashBoard";

export default async function Page() {
  const { user } = await useUser();
  if (user == null) {
    redirect("/auth");
  }
  return <DashBoard />;
}
