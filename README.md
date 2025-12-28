بناءً على رابط المستودع الخاص بك والمجموعة التقنية (Next.js, Prisma, Neon) التي استخدمتها، قمت بكتابة ملف `README.md` احترافي ومنظم. هذا الملف سيعطي انطباعاً رائعاً لأي مبرمج أو صاحب عمل يزور حسابك على GitHub.

إليك الكود، يمكنك نسخه ولصقه مباشرة في ملف `README.md` داخل مشروعك:

# 📚 Makal & Raki - مقال و رأي - Modern Blogging Platform

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat&logo=prisma)](https://www.prisma.io/)
[![Neon](https://img.shields.io/badge/Database-Neon.tech-00E599?style=flat&logo=postgresql)](https://neon.tech/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat&logo=vercel)](https://makal-raki.vercel.app/)

**Makal Raki** هو تطبيق ويب متكامل (Full-Stack) لنشر وقراءة المقالات، تم بناؤه باستخدام أحدث تقنيات الويب لضمان السرعة، الأمان، وتجربة مستخدم سلسة.

## 🚀 التقنيات المستخدمة (Tech Stack)

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Database ORM:** [Prisma](https://www.prisma.io/)
* **Database:** [Neon (PostgreSQL Serverless)](https://neon.tech/)
* **Styling:** Tailwind CSS
* **Deployment:** [Vercel](https://vercel.com/)

## ✨ المميزات الحالية
- ✅ **Server-Side Rendering (SSR):** لضمان أفضل أداء وسرعة في تحميل المقالات.
- ✅ **Cloud Database:** ربط كامل مع قاعدة بيانات Neon السحابية.
- ✅ **Responsive Design:** واجهة متجاوبة بالكامل تعمل على كافة الأجهزة (موبايل، تابلت، ديسكتوب).
- ✅ **Optimized Queries:** استعلامات قاعدة بيانات سريعة باستخدام Prisma.

## 🛠️ البدء بالعمل (Local Setup)

اتبع الخطوات التالية لتشغيل المشروع على جهازك المحلي:

1. **نسخ المستودع:**
   ```bash
   git clone [https://github.com/NinjaStackX/makal-raki.git](https://github.com/NinjaStackX/makal-raki.git)
   cd makal-raki

```

2. **تثبيت المكتبات:**
```bash
pnpm install
# أو
npm install

```


3. **إعداد متغيرات البيئة:**
قم بإنشاء ملف `.env` في المجلد الرئيسي وأضف رابط قاعدة البيانات الخاص بك:
```env
DATABASE_URL="your_postgresql_connection_string_from_neon"

```


4. **تجهيز قاعدة البيانات:**
```bash
npx prisma generate
npx prisma db push

```


5. **تشغيل المشروع:**
```bash
npm run dev

```



## 📸 معاينة المشروع

يمكنك رؤية النسخة الحية للمشروع هنا: [makal-raki.vercel.app](https://www.google.com/url?sa=E&source=gmail&q=https://makal-raki.vercel.app/)

## 📝 رخصة المشروع

هذا المشروع متاح تحت رخصة **MIT**.

---

بني بكل ❤️ بواسطة [NinjaStackX](https://www.google.com/search?q=https://github.com/NinjaStackX)
