import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppProviders from "@/providers"
import "./globals.css";
import { ThemeProvider } from "next-themes";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Store App",
  description: "Welcome to the store app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider attribute="class" enableSystem={true} defaultTheme="light">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-stone-900 text-black dark:text-white`}
        >
          <AppProviders>
            {children}
          </AppProviders>

        </body>
      </ThemeProvider>
    </html>
  );
}
