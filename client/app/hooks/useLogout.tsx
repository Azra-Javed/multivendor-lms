"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";

import { apiSlice } from "@/redux/features/api/apiSlice";
import { useLogOutMutation } from "@/redux/features/auth/authApi";
import { userLoggedOut } from "@/redux/features/auth/authSlice";

export const useLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [logout] = useLogOutMutation();

  const handleLogout = async () => {
    try {
      // 1. Logout from backend
      await logout().unwrap();

      // 2. Clear Redux state
      dispatch(userLoggedOut());

      // 3. Clear RTK Query cache
      dispatch(apiSlice.util.resetApiState());

      // 4. Logout from NextAuth
      await signOut({
        redirect: false,
      });

      // 5. Redirect
      router.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  return handleLogout;
};
