"use client";

import EditCourse from "@/app/components/Admin/Course/EditCourse";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";
import AdminSidebar from "@/app/components/Admin/Sidebar/AdminSidebar";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import { use, useState } from "react";

type Params = {
  id: string;
};

const Page = ({ params }: { params: Promise<Params> }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { id } = use(params);

  return (
    <AdminProtected>
      <div>
        <Heading
          title="SkillBridge Admin | Edit Course"
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
            <EditCourse isCollapsed={isCollapsed} id={id} />
          </div>
        </div>
      </div>
    </AdminProtected>
  );
};

export default Page;
