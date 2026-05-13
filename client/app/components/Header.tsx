// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import NavItems from "../utils/NavItems";
// import ThemeSwitcher from "../utils/ThemeSwitcher";
// import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
// import CustomModel from "../utils/CustomModel";
// import Login from "../components/Auth/Login";
// import SignUp from "../components/Auth/SignUp";
// import Verification from "../components/Auth/Verification";
// import { useSelector } from "react-redux";
// import Image from "next/image";
// import avatar from "../../public/assets/avatar.png";
// import { useSession } from "next-auth/react";
// import {
//   useLogOutQuery,
//   useSocialAuthMutation,
// } from "@/redux/features/auth/authApi";
// import toast from "react-hot-toast";
// import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

// interface Props {
//   open: boolean;
//   setOpen: (open: boolean) => void;
//   activeItem: number;
//   route: String;
//   setRoute: (route: string) => void;
// }

// const Header = ({ open, setOpen, activeItem, route, setRoute }: Props) => {
//   const [active, setActive] = useState(false);
//   const [openSidebar, setOpenSidebar] = useState(false);
//   const {
//     data: userData,
//     isLoading,
//     refetch,
//   } = useLoadUserQuery(undefined, {});

//   const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
//   const [logout, setLogout] = useState(false);
//   const {} = useLogOutQuery(undefined, {
//     skip: !logout,
//   });

//   const { data } = useSession();

//   useEffect(() => {
//     if (!isLoading) {
//       if (!userData && data) {
//         socialAuth({
//           email: data.user?.email,
//           name: data.user?.name,
//           avatar: data.user?.image,
//         });
//         refetch();
//       }
//     }

//     if (data === null && isSuccess) {
//       toast.success("Login successfully");
//     }

//     // User logged OUT from NextAuth
//     if (data === null && !isLoading && !userData) {
//       setLogout(true);
//     }
//   }, [data, userData]);

//   useEffect(() => {
//     const handleScroll = () => {
//       setActive(window.scrollY > 80);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleClose = (e: any) => {
//     if (e.target.id === "screen") {
//       {
//         setOpenSidebar(false);
//       }
//     }
//   };

//   return (
//     <div className="w-full relative">
//       <div
//         className={`${
//           active
//             ? "dark:bg-opacity-50 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
//             : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
//         }`}
//       >
//         <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
//           <div className="w-full h-20 flex items-center justify-between p-3">
//             <div>
//               <Link
//                 href={"/"}
//                 className={`text-[25px] font-Poppins font-medium text-black dark:text-white`}
//               >
//                 Azra Javed
//               </Link>
//             </div>
//             <div className="flex items-center">
//               <NavItems activeItem={activeItem} isMobile={false} />
//               <ThemeSwitcher />

//               {/* mobile */}
//               <div className="800px:hidden">
//                 <HiOutlineMenuAlt3
//                   size={25}
//                   className="cursor-pointer  dark:text-white text-black"
//                   onClick={() => setOpenSidebar(true)}
//                 />
//               </div>
//               {userData ? (
//                 <>
//                   <Link href={"/profile"}>
//                     <Image
//                       src={userData.avatar ? userData.avatar.url : avatar}
//                       width={30}
//                       height={30}
//                       alt=""
//                       className="h-[30px] w-[30px] rounded-full cursor-pointer"
//                       style={{
//                         border: activeItem === 5 ? "2px solid #37a39a" : "none",
//                       }}
//                     />
//                   </Link>
//                 </>
//               ) : (
//                 <HiOutlineUserCircle
//                   size={25}
//                   className="hidden 800px:block cursor-pointer text-black dark:text-white "
//                   onClick={() => setOpen(true)}
//                 />
//               )}
//             </div>
//           </div>
//         </div>

//         {/* moblile side-bar */}
//         {openSidebar && (
//           <div
//             className="fixed w-full h-screen top-0 left-0 z-99999 dark:bg-[unset] bg-[#00000024]"
//             onClick={handleClose}
//             id="screen"
//           >
//             <div className="w-[70%] fixed z-9999999 h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
//               <NavItems activeItem={activeItem} isMobile={true} />
//               {userData ? (
//                 <>
//                   <Link href={"/profile"}>
//                     <Image
//                       src={userData.avatar ? userData.avatar.url : avatar}
//                       width={30}
//                       height={30}
//                       alt=""
//                       className="h-[30px] w-[30px] rounded-full cursor-pointer ml-5"
//                       style={{
//                         border: activeItem === 5 ? "2px solid #37a39a" : "none",
//                       }}
//                     />
//                   </Link>
//                 </>
//               ) : (
//                 <HiOutlineUserCircle
//                   size={25}
//                   className="hidden 800px:block cursor-pointer text-black dark:text-white "
//                   onClick={() => setOpen(true)}
//                 />
//               )}
//               <br />
//               <br />
//               <p className="text-center px-2 pl-5 text-sm text-gray-500 dark:text-gray-400">
//                 © 2025 Azra Javed. All rights reserved.
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* popup */}
//       {route === "Login" && open && (
//         <CustomModel
//           refetch={refetch}
//           open={open}
//           setOpen={setOpen}
//           setRoute={setRoute}
//           activeItem={activeItem}
//           Component={Login}
//         />
//       )}

//       {route === "Sign-Up" && open && (
//         <CustomModel
//           open={open}
//           setOpen={setOpen}
//           setRoute={setRoute}
//           activeItem={activeItem}
//           Component={SignUp}
//         />
//       )}
//       {route === "Verification" && open && (
//         <CustomModel
//           open={open}
//           setOpen={setOpen}
//           setRoute={setRoute}
//           activeItem={activeItem}
//           Component={Verification}
//         />
//       )}
//     </div>
//   );
// };

// export default Header;

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
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
import toast from "react-hot-toast";
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
  const [logout, setLogout] = useState(false);
  useLogOutQuery(undefined, { skip: !logout });

  const { data } = useSession();

  useEffect(() => {
    if (!isLoading && !userData && data) {
      socialAuth({
        email: data.user?.email,
        name: data.user?.name,
        avatar: data.user?.image,
      });
      refetch();
    }

    if (data === null && isSuccess) toast.success("Login successfully");
    if (data === null && !isLoading && !userData) setLogout(true);
  }, [data, userData]);

  // sticky logic (same as before, just cleaner)
  useEffect(() => {
    const onScroll = () => setActive(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClose = (e: any) => {
    if (e.target.id === "screen") setOpenSidebar(false);
  };

  return (
    <header className="w-full relative">
      <div
        className={`${
          active
            ? "fixed top-0 left-0 w-full h-[64px] z-[80] bg-white dark:bg-slate-900 border-b dark:border-white/10 shadow-sm transition-all"
            : "w-full h-[64px] border-b dark:border-white/10"
        }`}
      >
        <div className="max-w-6xl mx-auto h-full px-4">
          <div className="h-full flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="text-lg font-semibold text-gray-900 dark:text-white"
            >
              Azra Javed
            </Link>

            {/* Right section */}
            <div className="flex items-center gap-4">
              {/* Desktop Nav */}
              <div className="hidden 800px:block">
                <NavItems activeItem={activeItem} isMobile={false} />
              </div>

              <ThemeSwitcher />

              {/* Mobile menu */}
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  size={22}
                  className="cursor-pointer text-gray-900 dark:text-white"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>

              {/* User */}
              {userData ? (
                <Link href="/profile">
                  <Image
                    src={userData.avatar ? userData.avatar.url : avatar}
                    width={28}
                    height={28}
                    alt="Profile"
                    className={`rounded-full cursor-pointer border ${
                      activeItem === 5
                        ? "border-teal-500"
                        : "border-transparent"
                    }`}
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={24}
                  className="hidden 800px:block cursor-pointer text-gray-900 dark:text-white"
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
        {openSidebar && (
          <div
            id="screen"
            onClick={handleClose}
            className="fixed inset-0 z-[9999] bg-black/30"
          >
            <aside className="absolute right-0 top-0 h-full w-[70%] bg-white dark:bg-slate-900 p-4">
              <NavItems activeItem={activeItem} isMobile={true} />

              <div className="mt-4">
                {userData ? (
                  <Link href="/profile">
                    <Image
                      src={userData.avatar ? userData.avatar.url : avatar}
                      width={32}
                      height={32}
                      alt="Profile"
                      className="rounded-full"
                    />
                  </Link>
                ) : (
                  <HiOutlineUserCircle
                    size={26}
                    className="cursor-pointer text-gray-900 dark:text-white"
                    onClick={() => setOpen(true)}
                  />
                )}
              </div>

              <p className="absolute bottom-4 left-4 right-4 text-xs text-gray-500 dark:text-gray-400">
                © 2025 Azra Javed
              </p>
            </aside>
          </div>
        )}
      </div>

      {/* Modals */}
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
