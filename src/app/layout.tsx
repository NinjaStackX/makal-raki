import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "./_css/globals.css";
import Header from "@/components/header/Header";
import Footer from "../components/Footer";
import { GlobalErrorBoundary } from "./GlobalErrorBoundary";

export const metadata: Metadata = {
  title: "Makal & Raki app",
  description: "المنصة العربية الأولى لروي حدود الابداع",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastContainer position="top-right" autoClose={3000} />
        <GlobalErrorBoundary>
          <Header />
          <main className="p-2.5 fix-height  ">{children}</main>
          <Footer />
        </GlobalErrorBoundary>
      </body>
    </html>
  );
}
