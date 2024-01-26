import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Toastify from "@/utils/toastify";
import { ThemeProvider } from "@/lib/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hospital Management System",
  description: "A hospital management system that is easy to use.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Toastify />
          <Navbar />
          <main className="w-full">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
