import Image from "next/image";
import avatarDefault from "../../../public/assets/avatar.png";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { useLogout } from "@/app/hooks/useLogout";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
};

const SidebarProfile = ({ user, active, avatar, setActive }: Props) => {
  const logout = useLogout();
  const router = useRouter();
  const [navigating, setNavigating] = useState(false);

  const handleAdminNavigate = () => {
    setNavigating(true);
    setActive(6);
    router.push("/admin");
  };

  const menuItem =
    "w-full flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-all duration-200";

  const activeStyle =
    "bg-teal-500/10 text-teal-500 dark:text-teal-400 border-r-2 border-teal-500";

  const inactiveStyle =
    "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5";

  const iconClass = "w-[22px] h-[22px] shrink-0";
  const labelClass = "text-base font-medium font-Poppins hidden 800px:block";

  return (
    <div className="w-full py-2">
      {/* My Account */}
      <div
        className={`${menuItem} ${active === 1 ? activeStyle : inactiveStyle}`}
        onClick={() => setActive(1)}
      >
        <Image
          src={
            user.avatar || avatar ? user.avatar?.url || avatar : avatarDefault
          }
          alt="avatar"
          width={22}
          height={22}
          className={`${iconClass} rounded-full object-cover`}
        />
        <span className={labelClass}>My Account</span>
      </div>

      {/* Change Password */}
      <div
        className={`${menuItem} ${active === 2 ? activeStyle : inactiveStyle}`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine className={iconClass} />
        <span className={labelClass}>Change Password</span>
      </div>

      {/* Enrolled Courses */}
      <div
        className={`${menuItem} ${active === 3 ? activeStyle : inactiveStyle}`}
        onClick={() => setActive(3)}
      >
        <SiCoursera className={iconClass} />
        <span className={labelClass}>Enrolled Courses</span>
      </div>

      {/* Admin Dashboard */}
      {user.role === "admin" && (
        <div
          className={`${menuItem} ${active === 6 ? activeStyle : inactiveStyle}`}
          onClick={handleAdminNavigate}
        >
          {navigating ? (
            <div
              className={`${iconClass} rounded-full border-2 border-teal-500
                          border-t-transparent animate-spin`}
            />
          ) : (
            <MdOutlineAdminPanelSettings className={iconClass} />
          )}
          <span className={labelClass}>
            {navigating ? "Loading..." : "Admin Dashboard"}
          </span>
        </div>
      )}

      {/* Divider */}
      <div className="h-px bg-gray-100 dark:bg-white/10 mx-4 my-2" />

      {/* Log Out */}
      <div
        className={`${menuItem} ${inactiveStyle} text-red-400 hover:text-red-500
                    dark:text-red-400 dark:hover:text-red-300`}
        onClick={logout}
      >
        <AiOutlineLogout className={iconClass} />
        <span className={labelClass}>Log Out</span>
      </div>
    </div>
  );
};

export default SidebarProfile;
