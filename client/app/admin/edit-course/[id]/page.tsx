"use client";
import React from "react";
import AdminSidebar from "../../../components/Admin/Sidebar/AdminSidebar";
import EditCourse from "../../../components/Admin/Course/EditCourse";
import Heading from "@/app/utils/Heading";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";

type Params = {
  id: string;
};

const Page = ({ params }: { params: Promise<Params> }) => {
  const { id } = React.use<Params>(params);

  console.log("page id", id);

  return (
    <>
      <Heading
        title="Elearning - Admin"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Programming,MERN,Redux,Machine Learning"
      />

      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>

        <div className="w-[85%]">
          <DashboardHeader />
          <EditCourse id={id} />
        </div>
      </div>
    </>
  );
};

export default Page;
