import Hero from "@/components/Home/Hero";
import { Target, Users, ShieldCheck, Heart } from "lucide-react";

const AboutPage = () => {
  return (
    <main className="min-h-screen pb-20">
      {/* قسم الهيرو الخاص بصفحة من نحن */}
      <Hero title={"قصتنا ورؤيتنا"}>
        <p className="text-zinc-600 text-lg max-w-2xl mx-auto leading-relaxed">
          نحن في <span className="text-blue-600 font-black">مقال ورأي</span>{" "}
          نؤمن أن الكلمة هي أقوى جسر للتواصل. أنشأنا هذه المنصة لتكون صوتاً لكل
          كاتب، ومساحةً لكل فكر، ومجتمعاً يحتفي بالتنوع الثقافي والفكري.
        </p>
      </Hero>

      <section className="container mx-auto px-4 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* بطاقة: مهمتنا */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-blue-50 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
              <Target size={24} />
            </div>
            <h3 className="text-xl font-black text-zinc-900 mb-3">مهمتنا</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              تمكين الأقلام العربية من الوصول إلى جمهور عالمي وتوفير بيئة تدوين
              احترافية وسلسة.
            </p>
          </div>

          {/* بطاقة: قيمنا */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-blue-50 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-black text-zinc-900 mb-3">النزاهة</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              نلتزم بأعلى معايير الشفافية واحترام الملكية الفكرية وضمان بيئة
              نقاش محترمة.
            </p>
          </div>

          {/* بطاقة: المجتمع */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-blue-50 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-black text-zinc-900 mb-3">المجتمع</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              بناء جسور التواصل بين الكتاب والقراء من خلال نظام تعليقات تفاعلي
              ومثمر.
            </p>
          </div>

          {/* بطاقة: الشغف */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-blue-50 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
              <Heart size={24} />
            </div>
            <h3 className="text-xl font-black text-zinc-900 mb-3">الشغف</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              نحن فريق يعشق المحتوى، ونعمل باستمرار على تطوير أدواتنا لتناسب
              طموحاتكم.
            </p>
          </div>
        </div>

        {/* قسم إضافي: رسالة للمستخدم */}
        <div className="mt-20 bg-blue-600 rounded-[3rem] p-12 text-center text-white shadow-2xl shadow-blue-200 overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-4">
              هل أنت جاهز لتكون جزءاً من قصتنا؟
            </h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              انضم إلى آلاف الكتاب الذين بدأوا رحلتهم معنا اليوم، وشارك العالم
              أفكارك وآراءك.
            </p>
            <button className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-black hover:bg-zinc-100 transition-all active:scale-95 shadow-lg">
              ابدأ التدوين الآن
            </button>
          </div>
          {/* حركة خلفية خفيفة */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full -ml-20 -mb-20 blur-3xl"></div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
