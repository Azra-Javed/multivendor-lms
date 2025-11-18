"use client";
import { Josefin_Sans, Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Providers } from "./provider";
import { ThemeProvider } from "./utils/theme-provider";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-Poppins",
  weight: ["400", "500", "600", "700"],
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-Josefin",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${josefin.variable} bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster position="top-center" reverseOrder={false} />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
