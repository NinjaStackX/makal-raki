import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "./_css/globals.css";
import Header from "@/components/header/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Hostigre app",
  description: "buy and sale hosts on web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
        <main className="p-2.5">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
