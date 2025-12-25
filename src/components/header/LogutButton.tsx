import { logoutAction } from "@/serverActions/auth";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="bg-red-500 hover:bg-red-600 text-white font-bold p-2.5 rounded-2xl transition-colors"
      >
        <LogOut />
      </button>
    </form>
  );
};

export default LogoutButton;
