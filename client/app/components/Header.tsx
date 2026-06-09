"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle, HiX } from "react-icons/hi";
import CustomModel from "../utils/CustomModel";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";
import Image from "next/image";
import avatar from "../../public/assets/avatar.png";
import { useSession } from "next-auth/react";
import {
  useLogOutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: String;
  setRoute: (route: string) => void;
}

const Header = ({ open, setOpen, activeItem, route, setRoute }: Props) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, {});
  const [socialAuth, { isSuccess }] = useSocialAuthMutation();
  const [logoutTrigger, setLogoutTrigger] = useState(false);

  useLogOutQuery(undefined, { skip: !logoutTrigger });

  const { data } = useSession();

  useEffect(() => {
    const syncUser = async () => {
      if (data?.user && !userData) {
        try {
          await socialAuth({
            email: data.user.email,
            name: data.user.name,
            avatar: data.user.image,
          }).unwrap();
          await refetch();
        } catch (err) {
          console.log(err);
        }
      }
    };
    syncUser();
  }, [data]);

  // sticky on scroll
  useEffect(() => {
    const onScroll = () => setActive(window.scrollY > 70);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClose = (e: any) => {
    if (e.target.id === "screen") setOpenSidebar(false);
  };

  return (
    <header className="w-full relative">
      {/* ── Main nav bar ── */}
      <div
        className={`h-[64px] w-full transition-all duration-300
          ${
            active
              ? "fixed top-0 left-0 z-[80] bg-transparnet  backdrop-blur-md border-b border-gray-300 dark:border-white/10 shadow-sm"
              : "border-b border-gray-300 dark:border-white/10 bg-transparent"
          }`}
      >
        <div className="max-w-6xl mx-auto h-full px-4 sm:px-10">
          <div className="h-full flex items-center justify-between gap-8">
            {/* Logo */}
            <Link
              href="/"
              className="text-[24px] font-[700] text-gray-900 dark:text-white font-Poppins shrink-0 hover:text-teal-500 dark:hover:text-teal-400 transition-colors duration-200"
            >
              Skill<span className="text-teal-500">Bridge</span>
            </Link>
            {/* Center: desktop nav */}
            <div className="hidden 800px:flex flex-1 justify-center" pl-8>
              <NavItems activeItem={activeItem} isMobile={false} />
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-3 shrink-0">
              <ThemeSwitcher />

              {/* User avatar or login icon — desktop */}
              {userData ? (
                <Link href="/profile" className="hidden 800px:block">
                  <Image
                    src={userData?.user?.avatar?.url || avatar}
                    width={36}
                    height={36}
                    alt="Profile"
                    className={`w-9 h-9 min-w-[36px] min-h-[36px] rounded-full object-cover
                                border-2 transition-all duration-200
                                ${
                                  activeItem === 5
                                    ? "border-teal-500"
                                    : "border-gray-200 dark:border-white/20 hover:border-teal-500"
                                }`}
                  />
                </Link>
              ) : (
                <button
                  onClick={() => setOpen(true)}
                  className="hidden 800px:flex items-center gap-2 px-4 py-1.5 rounded-lg
                             border border-gray-200 dark:border-white/10
                             bg-white dark:bg-slate-800
                             text-sm font-medium text-gray-700 dark:text-gray-200
                             hover:border-teal-500 hover:text-teal-500
                             dark:hover:border-teal-500 dark:hover:text-teal-400
                             transition-all duration-200 font-Poppins"
                >
                  <HiOutlineUserCircle size={18} />
                  Login
                </button>
              )}

              {/* Mobile hamburger */}
              <button
                className="800px:hidden p-1.5 rounded-lg
                           border border-gray-200 dark:border-white/10
                           bg-white dark:bg-slate-800
                           text-gray-700 dark:text-gray-200
                           hover:border-teal-500 hover:text-teal-500
                           transition-all duration-200"
                onClick={() => setOpenSidebar(true)}
                aria-label="Open menu"
              >
                <HiOutlineMenuAlt3 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile sidebar ── */}
      {openSidebar && (
        <div
          id="screen"
          onClick={handleClose}
          className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm"
        >
          <aside
            className="absolute right-0 top-0 h-full w-[72%] max-w-[300px]
                       bg-white dark:bg-slate-900
                       border-l border-gray-200 dark:border-white/10
                       shadow-xl flex flex-col"
          >
            {/* Sidebar header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/10">
              <span className="text-xl font-semibold text-gray-900 dark:text-white font-Poppins">
                Skill<span className="text-teal-500">Bridge</span>
              </span>
              <button
                onClick={() => setOpenSidebar(false)}
                className="p-1.5 rounded-lg border border-gray-200 dark:border-white/10
                           text-gray-500 dark:text-gray-400
                           hover:border-teal-500 hover:text-teal-500
                           transition-all duration-200"
                aria-label="Close menu"
              >
                <HiX size={16} />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <NavItems activeItem={activeItem} isMobile={true} />
            </div>

            {/* Sidebar footer: user */}
            <div className="px-5 py-4 border-t border-gray-100 dark:border-white/10">
              {userData ? (
                <Link
                  href="/profile"
                  className="flex items-center gap-3"
                  onClick={() => setOpenSidebar(false)}
                >
                  <Image
                    src={userData?.user?.avatar?.url || avatar}
                    width={40}
                    height={40}
                    alt="Profile"
                    className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full object-cover border-2 border-teal-500"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white font-Poppins">
                      {userData?.user?.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-Poppins">
                      View profile
                    </p>
                  </div>
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setOpen(true);
                    setOpenSidebar(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg
                             bg-teal-500 text-white text-sm font-medium font-Poppins
                             hover:bg-teal-600 transition-colors duration-200"
                >
                  <HiOutlineUserCircle size={18} />
                  Login / Sign Up
                </button>
              )}

              <p className="mt-4 text-xs text-gray-400 dark:text-gray-500 font-Poppins text-center">
                © 2026 SkillBridge
              </p>
            </div>
          </aside>
        </div>
      )}

      {/* ── Modals ── */}
      {route === "Login" && open && (
        <CustomModel
          refetch={refetch}
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          Component={Login}
        />
      )}

      {route === "Sign-Up" && open && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          Component={SignUp}
        />
      )}

      {route === "Verification" && open && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          Component={Verification}
        />
      )}
    </header>
  );
};

export default Header;
