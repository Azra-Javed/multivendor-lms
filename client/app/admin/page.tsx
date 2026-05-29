"use client";

import { useState } from "react";
import AdminSidebar from "../components/Admin/Sidebar/AdminSidebar";
import Heading from "../utils/Heading";
import AdminProtected from "../hooks/adminProtected";
import DashboardHero from "../components/Admin/DashboardHero";

const Page = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <AdminProtected>
      <div>
        <Heading
          title="SkillBridge -  Admin "
          description="SkillBridge is an online learning platform where students can learn modern skills from expert instructors."
          keywords="SkillBridge, programming, MERN, Redux, machine learning, admin dashboard"
        />

        <div className="flex w-full">
          <AdminSidebar onCollapsedChange={setIsCollapsed} />

          <div
            className={`flex-1 transition-all duration-300 min-w-0 ${
              isCollapsed ? "ml-[52px] lg:ml-[72px]" : "ml-[52px] lg:ml-[255px]"
            }`}
          >
            <DashboardHero isDashboard={true} />
          </div>
        </div>
      </div>
    </AdminProtected>
  );
};

export default Page;
