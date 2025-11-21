"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AdminProtected = ({ children }: Props) => {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    // If user is not admin → redirect
    if (!user || user.role !== "admin") {
      router.replace("/");
    }
  }, [user, router]);

  // While checking → return nothing or loader
  if (!user || user.role !== "admin") return null;

  return <>{children}</>;
};

export default AdminProtected;
