import { redirect } from "next/navigation";
import { ReactNode } from "react";
import userAuth from "./userAuth";

interface Props {
  children: ReactNode;
}

export default function Protected({ children }: Props) {
  const isAuthenticated = userAuth();

  return isAuthenticated ? children : redirect("/");
}
