"use client";

import { use, useEffect } from "react";
import Loader from "@/app/components/Loader/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useRouter } from "next/navigation";
import CourseContent from "../../components/Course/CourseContent";
import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";

type Props = {
  params: Promise<{ id: string }>;
};

export default function Page({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();

  // USER (purchased courses)
  const { data: userData, isLoading, error } = useLoadUserQuery(undefined);

  // COURSE (owner check comes from here)
  const { data: courseData, isLoading: courseLoading } =
    useGetCourseDetailsQuery(id);

  useEffect(() => {
    if (error) {
      router.replace("/");
      return;
    }

    if (!userData?.user || !courseData?.course) return;

    // PURCHASE CHECK
    const isPurchased = userData.user.courses?.some(
      (item: any) => String(item._id) === String(id),
    );

    //  OWNER CHECK (FIXED)
    const isOwner =
      String(courseData.course.createdBy) === String(userData.user._id);

    const hasAccess = isPurchased || isOwner;

    if (!hasAccess) {
      router.replace("/");
    }
  }, [userData, courseData, error, id, router]);

  if (isLoading || courseLoading) return <Loader />;

  return <CourseContent id={id} user={userData?.user} />;
}
