import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import LogoutButton from "./LogutButton";
import { Contact2Icon, PersonStandingIcon } from "lucide-react";

const BtnAuth = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  return (
    <div className="flex items-center gap-3">
      {session ? (
        <>
          <Link
            className="bg-gradient-to-r from-blue-500 to-indigo-700 font-bold text-white p-2.5 rounded-2xl"
            href="/profile"
          >
            <Contact2Icon />
          </Link>
          {/* زر تسجيل الخروج يحتاج أن يكون Client Component */}
          <LogoutButton />
        </>
      ) : (
        <Link
          className="bg-gradient-to-r from-green-500 to-purple-800 font-bold text-amber-50 p-2.5 rounded-2xl"
          href="/auth"
        >
          Join Us
        </Link>
      )}
    </div>
  );
};

export default BtnAuth;
