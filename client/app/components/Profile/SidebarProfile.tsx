import Image from "next/image";
import avatarDefault from "../../../public/assets/avatar.png";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { useLogout } from "@/app/hooks/useLogout";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from "next/link";

type Props = {
  user: any;
  active: number;
  avatar: string | null;

  setActive: (active: number) => void;
};

const SidebarProfile = ({ user, active, avatar, setActive }: Props) => {
  const logout = useLogout();

  return (
    <div className="w-full">
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1 ? "dark:bg-slate-800 bg-[#b4b2b2]" : "bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={
            user.avatar || avatar ? user.avatar.url || avatar : avatarDefault
          }
          alt="user-avatar"
          width={20}
          height={20}
          className="w-[20px] h-[20px] 800px:h-[30px] 800px:w-[30px] rounded-full"
        />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white">
          My Account
        </h5>
      </div>

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 2 ? "dark:bg-slate-800 bg-[#b4b2b2]" : "bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine className="w-[20px] h-[20px] 800px:h-[30px] 800px:w-[30px]" />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white">
          Change Password
        </h5>
      </div>

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 3 ? "dark:bg-slate-800 bg-[#b4b2b2]" : "bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera className="w-[20px] h-[20px] 800px:h-[30px] 800px:w-[30px]" />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white">
          Enrolled Courses
        </h5>
      </div>

      {user.role === "admin" && (
        <Link
          href={"/admin"}
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${
            active === 6 ? "dark:bg-slate-800 bg-[#b4b2b2]" : "bg-transparent"
          }`}
          onClick={() => setActive(6)}
        >
          <MdOutlineAdminPanelSettings className="w-[20px] h-[20px] 800px:h-[30px] 800px:w-[30px]" />
          <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white">
            Admin Dashboard
          </h5>
        </Link>
      )}

      <div
        className="w-full flex items-center px-3 py-4 cursor-pointer"
        onClick={logout}
      >
        <AiOutlineLogout className="w-[20px] h-[20px] 800px:h-[30px] 800px:w-[30px]" />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white">
          Log Out
        </h5>
      </div>
    </div>
  );
};

export default SidebarProfile;
