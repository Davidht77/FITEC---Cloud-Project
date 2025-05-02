import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FITEC - Tu gimnasio de alto rendimiento",
  description:
    "FITEC es el gimnasio completo que te ofrece entrenamiento personalizado, equipos de última generación y una comunidad que te impulsa a ser mejor.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.className} bg-gradient-to-br from-sky-900 via-sky-800 to-sky-950 text-white min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1"  style={{ viewTransitionName: 'page-main-content' }}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
