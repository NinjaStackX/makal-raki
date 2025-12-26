# 📝 Maqal & Raki (مقال ورأي)
### "Nurturing and Breaking the Boundaries of Creativity"

** Maqal & Raki ** is a modern Arabic blogging platform built with the latest web technologies. It focuses on providing an exceptional user experience (UX) for both writers and readers, featuring a minimalist design, high performance, and an intuitive interface.

---

## 🚀 Tech Stack

The project is built using a modern software architecture to ensure scalability and speed:

* **Framework:** [Next.js 15 (App Router)](https://nextjs.org/) – Utilizing Server Components and optimized rendering.
* **Library:** [React 19](https://react.dev/) – Leveraging the new `use` hook and improved form handling.
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) – A "Utility-first" design system with a custom Zinc & Blue color palette.
* **Database & ORM:** [Prisma](https://www.prisma.io/) – Efficient ORM for secure and fast database queries.
* **Icons:** [Lucide React](https://lucide.dev/) – Clean and consistent iconography.
* **State Management:** Next.js Server Actions for seamless backend logic without complex API setups.

---

## ✨ Key Features

* **Article Management (Full CRUD):** Create, Read, Update, and Delete articles with a smooth workflow.
* **Interactive UI:** Custom-built Modals for editing and deleting to provide a professional user experience by using **parallel routes**.
* **Comment System:** Encourages engagement between authors and readers through a nested discussion system.
* **Responsive Design:** Fully optimized for all devices, from mobile phones to high-resolution desktops.
* **Data Security:** Server-side validation and secure database transactions using Prisma.
* **Visual Identity:** A clean "Minimalist" aesthetic using warm grays (Zinc) and royal blue accents.

---

## 📁 Project Structure

```text
src/
├── app/               # App Router: Pages, Layouts, and Parallel Routes
├── components/        # Reusable UI components (Navbar, Footer, Modals, Cards)
├── serverActions/     # Backend logic and Database operations (Server Actions)
├── lib/               # Third-party configurations (Prisma Client)
└── utils/             # Helper functions and TypeScript definitions
