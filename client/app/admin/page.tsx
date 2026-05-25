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
            <DashboardHero isDashboard={true} />
          </div>
        </div>
      </div>
    </AdminProtected>
  );
};

export default Page;
