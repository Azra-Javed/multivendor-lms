"use client";

import { signOut } from "next-auth/react";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { useEffect, useState } from "react";

export const useLogout = () => {
  const [trigger, setTrigger] = useState(false);

  // RTK Query logout API (only runs when trigger = true)
  const { isSuccess } = useLogOutQuery(undefined, { skip: !trigger });

  useEffect(() => {
    if (isSuccess) {
      signOut({ redirect: true, callbackUrl: "/" });
    }
  }, [isSuccess]);

  const handleLogout = async () => {
    setTrigger(true);
  };

  return handleLogout;
};
