import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

import { Contact2Icon, LogOut, PersonStandingIcon } from "lucide-react";
import { getServerData } from "@/serverActions/cookie";
import { logoutAction } from "@/serverActions/auth";

const BtnAuth = async () => {
  const session = (await getServerData())?.session;

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
          <form action={logoutAction}>
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white font-bold p-2.5 rounded-2xl transition-colors"
            >
              <LogOut />
            </button>
          </form>
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
