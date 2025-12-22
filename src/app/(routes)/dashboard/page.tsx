import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import DashBoard from "./DashBoard";

export default async function Page() {
  const { user } = await useAuth();
  if (user == null) {
    redirect("/auth");
  }
  return <DashBoard />;
}
