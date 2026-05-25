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
          title="Elearning- Admin"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
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
