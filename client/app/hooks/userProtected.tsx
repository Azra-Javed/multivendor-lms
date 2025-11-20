"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import userAuth from "./userAuth";

export default function Protected({ children }: { children: ReactNode }) {
  const router = useRouter();
  const isAuthenticated = userAuth(); // reads localStorage / redux / etc.

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/"); // client-side redirect
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // or return your <Loader />
  }

  return children;
}
