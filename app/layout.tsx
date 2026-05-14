import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"

import { ThemeProvider } from "@/components/providers/ThemeProvider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Nalaruta",
  description: "Platform roadmap belajar karier teknologi",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
  lang="id"
  suppressHydrationWarning
>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <ThemeProvider
  attribute="class"
  defaultTheme="light"
  enableSystem={false}
>
  {children}
</ThemeProvider>
      </body>
    </html>
  )
}