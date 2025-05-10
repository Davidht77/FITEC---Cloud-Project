"use client";

import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${inter.className} bg-gradient-to-br from-sky-900 via-sky-800 to-sky-950 text-white flex flex-col`}
    >
      <Navbar />
      <main className="w-full flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
