"use client";
// import Link from "next/link";
// import styles from "./header.module.css";
// import { Globe, ListChevronsDownUp, ListChevronsUpDown } from "lucide-react";

// import { useState } from "react";

// interface NavbarProps {
//   isAdmin: boolean;
// }

// const Navbar = ({ isAdmin }: NavbarProps) => {
//   const [toggle, setToggle] = useState(false);

//   return (
//     <nav className={styles.navbar}>
//       <div>
//         <Link href="/" className={styles.logo}>
//           CLOUD
//           <Globe />
//           HOSTING
//         </Link>
//         <div className={styles.menu}>
//           {toggle ? (
//             <ListChevronsDownUp onClick={() => setToggle((prev) => !prev)} />
//           ) : (
//             <ListChevronsUpDown onClick={() => setToggle((prev) => !prev)} />
//           )}
//         </div>
//       </div>
//       <div
//         className={styles.navLinksWrapper}
//         style={{
//           clipPath: (toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)") || "",
//         }}
//       >
//         <ul className={styles.navLinks}>
//           <Link
//             onClick={() => setToggle(false)}
//             className={styles.navLink}
//             href="/"
//           >
//             Home
//           </Link>
//           <Link
//             onClick={() => setToggle(false)}
//             className={styles.navLink}
//             href="/articles?pageNumber=1"
//           >
//             Articles
//           </Link>
//           <Link
//             onClick={() => setToggle(false)}
//             className={styles.navLink}
//             href="/about"
//           >
//             About
//           </Link>
//           {isAdmin && (
//             <Link
//               onClick={() => setToggle(false)}
//               className={styles.navLink}
//               href="/admin"
//             >
//               Admin Dashboard
//             </Link>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PenTool,
  Home,
  Newspaper,
  Info,
  LogOut,
  User,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import { logoutAction } from "@/serverActions/auth";

interface NavbarProps {
  session: number | null;
  isAdmin: boolean;
}

const Navbar = ({ session, isAdmin }: NavbarProps) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "الرئيسية", href: "/", icon: <Home size={18} /> },
    {
      name: "المقالات",
      href: "/articles?pageNumber=1",
      icon: <Newspaper size={18} />,
    },
    { name: "من نحن", href: "/about", icon: <Info size={18} /> },
  ];

  return (
    <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-zinc-100 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo - الشعار */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100 group-hover:rotate-6 transition-transform">
            <PenTool size={22} fill="currentColor" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black text-zinc-900 leading-none">
              مقال <span className="text-blue-600">&</span> رأي
            </span>
            <span className="text-[10px] font-bold text-zinc-400 mt-1">
              نروي ونكسر حدود الإبداع
            </span>
          </div>
        </Link>

        {/* Desktop Links - الروابط الأساسية */}
        <div className="hidden md:flex items-center gap-1 bg-zinc-100/50 p-1 rounded-2xl border border-zinc-100">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                pathname === link.href
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
            >
              <ShieldCheck size={18} /> لوحة الإدارة
            </Link>
          )}
        </div>

        {/* Auth Actions - تسجيل الدخول والخروج */}
        <div className="flex items-center gap-2">
          {session ? (
            <div className="flex items-center gap-2">
              <Link
                href="/profile"
                className={`p-2.5 rounded-xl border transition-all ${
                  pathname === "/profile"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white border-zinc-100 text-zinc-600 hover:border-blue-100"
                }`}
              >
                <User size={20} />
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="p-2.5 bg-zinc-50 hover:bg-red-50 text-zinc-400 hover:text-red-500 rounded-xl border border-zinc-100 hover:border-red-100 transition-all"
                >
                  <LogOut size={20} />
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/auth"
              className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-100 active:scale-95 transition-all"
            >
              انضم إلينا
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-zinc-600"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-zinc-100 p-4 space-y-2 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 p-4 rounded-2xl text-zinc-600 font-bold hover:bg-blue-50 hover:text-blue-600 transition-all"
            >
              {link.icon} {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
