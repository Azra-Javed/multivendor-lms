"use client";

import { useEffect, useState } from "react";
import SidebarProfile from "./SidebarProfile";
import ProfileInfo from "./ProfileInfo";
type Props = {
  user: any;
};

const Profile = ({ user }: Props) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);

  // FIXED: Proper scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 85);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-white bg-opacity-90 border dark:border-[#ffffff1d] border-[#e6e3e3bb] rounded-[5px] shadow-sm dark:shadow-sm mt-[80px] mb-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        } left-[30px]`}
      >
        <SidebarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
        />
      </div>

      {active === 1 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ProfileInfo avatar={avatar} user={user} />
        </div>
      )}
    </div>
  );
};

export default Profile;
