import Link from "next/link";
import {
  PenTool,
  Twitter,
  Github,
  Linkedin,

  ArrowUpRight,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // تم تغيير الخلفية لرمادي فاتح جداً (Zinc-100) ليناسب باقي الموقع
    <footer className="bg-zinc-100/80 border-t border-zinc-200 pt-20 pb-10 px-4 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* العمود الأول: الهوية */}
          <div className="col-span-1 md:col-span-1.5 space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 transition-transform group-hover:scale-105">
                <PenTool size={22} fill="currentColor" />
              </div>
              <span className="text-xl font-black text-zinc-800 tracking-tight">
                مقال <span className="text-blue-600">&</span> رأي
              </span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs font-medium">
              مساحة تدوين عربية تجمع بين أناقة التصميم وقوة المحتوى، صُممت لتكون
              منبراً للفكر الحر والنقاش الهادف.
            </p>
            <div className="flex gap-3">
              {[Twitter, Github, Linkedin].map((Icon, index) => (
                <Link
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white border border-zinc-200 text-zinc-400 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* العمود الثاني: استكشف */}
          <div>
            <h4 className="text-zinc-800 font-black text-xs uppercase tracking-[0.2em] mb-6">
              استكشف
            </h4>
            <ul className="space-y-4">
              {["الرئيسية", "أحدث المقالات", "تصنيفاتنا", "أبرز الكتاب"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-zinc-500 text-sm font-bold hover:text-blue-600 flex items-center gap-1 group transition-colors"
                    >
                      {item}
                      <ArrowUpRight
                        size={14}
                        className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
                      />
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* العمود الثالث: المساعدة */}
          <div>
            <h4 className="text-zinc-800 font-black text-xs uppercase tracking-[0.2em] mb-6">
              المساعدة
            </h4>
            <ul className="space-y-4 text-zinc-500 text-sm font-bold">
              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-600 transition-colors"
                >
                  من نحن
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-600 transition-colors"
                >
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-600 transition-colors"
                >
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود الرابع: النشرة البريدية - كرت أبيض بارز */}
          <div className="bg-white p-6 rounded-[2.5rem] border border-zinc-200 shadow-sm">
            <h4 className="text-zinc-900 font-black text-sm mb-2">
              النشرة البريدية
            </h4>
            <p className="text-zinc-400 text-[11px] font-bold mb-4 leading-relaxed">
              كن أول من يقرأ مقالاتنا الجديدة وحصاد الأسبوع.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="w-full bg-zinc-50 border border-zinc-100 rounded-xl py-3 px-4 text-xs outline-none focus:border-blue-400 focus:bg-white transition-all"
              />
              <button className="w-full py-3 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">
                اشترك الآن
              </button>
            </div>
          </div>
        </div>

        {/* سطر الحقوق السفلي */}
        <div className="pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">
          <p>© {currentYear} مقال ورأي • بكل حب من الوطن العربي</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-blue-600 cursor-pointer transition-colors">
              عربي (RTL)
            </span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors">
              English
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
