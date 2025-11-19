"use client";

import { signOut } from "next-auth/react";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { useState } from "react";

export const useLogout = () => {
  const [trigger, setTrigger] = useState(false);

  // RTK Query logout API (only runs when trigger = true)
  useLogOutQuery(undefined, { skip: !trigger });

  const handleLogout = async () => {
    setTrigger(true);
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return handleLogout;
};
