"use client";
import { SessionProvider } from "next-auth/react";
import { Josefin_Sans, Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import UserLoader from "./components/Loader/UserLoader";
import "./globals.css";
import { Providers } from "./provider";
import { ThemeProvider } from "./utils/theme-provider";
import Script from "next/script";

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

<Script src="https://player.vdocipher.com/v2/api.js" strategy="lazyOnload" />;

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
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <UserLoader>{children}</UserLoader>
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
