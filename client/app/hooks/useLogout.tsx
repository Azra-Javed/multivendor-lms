"user client";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export const useLogout = () => {
  const [trigger, setTrigger] = useState(false);
  const { isSuccess } = useLogOutQuery(undefined, { skip: !trigger });

  useEffect(() => {
    if (isSuccess) {
      signOut({ redirect: false }).then(() => {
        window.location.href = "/";
      });
    }
  }, [isSuccess]);

  const handleLogout = async () => {
    setTrigger(true);
  };

  return handleLogout;
};
