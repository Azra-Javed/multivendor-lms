"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import UserLoader from "./components/Loader/UserLoader";
import { Providers } from "./provider";
import { ThemeProvider } from "./utils/theme-provider";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <UserLoader>{children}</UserLoader>
          <Toaster position="top-center" reverseOrder={false} />
          <Script
            src="https://player.vdocipher.com/v2/api.js"
            strategy="lazyOnload"
          />
        </ThemeProvider>
      </SessionProvider>
    </Providers>
  );
}
