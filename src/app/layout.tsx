import { ResLogout, logout } from "@/api/auth/logout"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import type { Metadata } from "next"
import { Nunito, Roboto } from "next/font/google"
import { AuthProvider } from "./authContext"
import "./globals.css"

export const metadata: Metadata = {
  title: "Seal Space",
  description: "Co-working space reservation platform",
}

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
})

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-nunito",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${nunito.variable} bg-stone font-roboto`}>
        <div className="flex min-h-screen flex-col">
          <AuthProvider>
            <Navbar/>
            {children}
            <Footer />
          </AuthProvider>
        </div>
      </body>
    </html>
  )
}
