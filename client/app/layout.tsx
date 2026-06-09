import { Josefin_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "./client-providers";

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

export const metadata = {
  title: "SkillBridge LMS App",
  description:
    "SkillBridge is an online learning platform where students can learn modern skills from expert instructors.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${josefin.variable} duration-300`}>
        <div
          className={` min-h-screen dark:bg-gradient-to-br dark:from-[#1f1f23] dark:via-[#3b3b52] dark:to-[#16232b]`}
        >
          <ClientProviders>{children}</ClientProviders>
        </div>
      </body>
    </html>
  );
}
