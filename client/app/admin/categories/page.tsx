"use client";

import EditCategories from "@/app/components/Admin/Customization/EditCategories";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";
import AdminSidebar from "@/app/components/Admin/Sidebar/AdminSidebar";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import { useState } from "react";

type Props = {};

const page = (props: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <AdminProtected>
      <div>
        <Heading
          title="SkillBridge Admin | Categories"
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
            <DashboardHeader />
            <EditCategories />
          </div>
        </div>
      </div>
    </AdminProtected>
  );
};

export default page;
