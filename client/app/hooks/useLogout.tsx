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
    // 1. Remove NextAuth session first
    await signOut({ redirect: false });

    // 2. Logout backend
    await logout().unwrap();

    // 3. Clear Redux
    dispatch(userLoggedOut());

    // 4. Clear RTK Query cache
    dispatch(apiSlice.util.resetApiState());

    // 5. Redirect
    router.replace("/");
  } catch (err) {
    console.log(err);
  }
};

  return handleLogout;
};
