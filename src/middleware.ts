import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "./lib/crypto";
import { pr } from "./lib/pr";

// --- إعدادات التشفير السريع (Web Crypto API) ---
export async function middleware(request: NextRequest) {
  const reqCook = request.cookies.get("state")?.value;

  if (!reqCook) return NextResponse.next();

  // فك التشفير (يجب استخدام await)
  const decryptedData = await decrypt(reqCook);
  const state = JSON.parse(decryptedData);

  const session = state?.session;
  const userRole = state?.userRole;
  const { pathname } = request.nextUrl;
  pr("==================================");
  // 2. إذا حاول المستخدم الدخول لصفحات المحمية وهو ليس مسجل دخول
  if (
    !session &&
    (pathname.startsWith("/profile") || pathname.startsWith("/admin"))
  ) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  //   // 3. حماية مسارات الأدمن (Admin Only)
  if (pathname.startsWith("/admin") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  //   // 4. إذا كان مسجل دخول وحاول فتح صفحة الـ Login أو Register
  if (session && pathname === "/auth") {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

// تحديد المسارات التي يعمل عليها الـ Middleware
export const config = {
  matcher: ["/profile/:path*", "/admin/:path*", "/auth/:path*"],
};
