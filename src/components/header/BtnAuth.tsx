import { prisma } from "@/lib/prisma";
import { useAuth } from "@/hooks/useAuth";
import { cookies } from "next/headers";
import Link from "next/link";

import React from "react";

const BtnAuth = async () => {
  const { user } = await useAuth();

  if (user) {
    return (
      <Link
        className="bg-gradient-to-r from-green-500 to-purple-800 font-bold text-amber-50 p-2.5 rounded-2xl"
        href="/dashboard"
      >
        Dashboard
      </Link>
    );
  }
  return (
    <Link
      className="bg-gradient-to-r from-green-500 to-purple-800 font-bold text-amber-50 p-2.5 rounded-2xl"
      href="/auth"
    >
      Join Us
    </Link>
  );
};

export default BtnAuth;
