import { getServerData } from "@/serverActions/tools";
import Navbar from "./Navbar";

const Header = async () => {
  // جلب بيانات المستخدم والسشن من السيرفر
  const data = await getServerData();
  const session = data?.session;
  const isAdmin = data?.userRole === "ADMIN";

  return <Navbar session={session} isAdmin={isAdmin} />;
};

export default Header;
