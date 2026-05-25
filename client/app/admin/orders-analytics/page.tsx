"use client";

import { useState } from "react";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import AdminSidebar from "@/app/components/Admin/Sidebar/AdminSidebar";
import AllUsers from "../../components/Admin/Users/AllUsers";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";
import UserAnalytics from "@/app/components/Admin/Analytics/UsersAnalytics";
import OrdersAnalytics from "@/app/components/Admin/Analytics/OrdersAnalytics";

type Props = {};

const page = (props: Props) => {
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
            <DashboardHeader />
            <OrdersAnalytics />
          </div>
        </div>
      </div>
    </AdminProtected>
  );
};

export default page;
