import { pr } from "@/lib/pr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. جلب الكوكي (نفترض أن اسمه 'session')
  const session = request.cookies.get("session")?.value;

  // نفترض أنك تخزن الـ Role في كوكي منفصل أو داخل التوكن
  const userRole = request.cookies.get("userRole")?.value;

  const { pathname } = request.nextUrl;

  // 2. إذا حاول المستخدم الدخول لصفحات المحمية وهو ليس مسجل دخول
  if (
    !session &&
    (pathname.startsWith("/profile") || pathname.startsWith("/admin"))
  ) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  //   // 3. حماية مسارات الأدمن (Admin Only)
  if (pathname.startsWith("/admin") && userRole !== "ADMIN") {
    pr("hiiiiiiiiii");
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
