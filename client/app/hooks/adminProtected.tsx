import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { useSelector } from "react-redux";

type Props = {
  children: ReactNode;
};

const adminProtected = ({ children }: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const isAdmin = user?.role === "amdin";
  return isAdmin ? children : redirect("/");
};

export default adminProtected;
