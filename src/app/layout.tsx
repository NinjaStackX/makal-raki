import type { Metadata } from "next";
import { Bounce, ToastContainer } from "react-toastify";
import "./_css/globals.css";
import Header from "@/components/header/Header";
import Footer from "../components/Footer";
import { GlobalErrorBoundary } from "./GlobalErrorBoundary";

export const metadata: Metadata = {
  title: "Hostigre app",
  description: "buy and sale hosts on web",
};

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
