"use client";

import * as React from "react";
import Loader from "@/app/components/Loader/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useRouter } from "next/navigation";
import CourseContent from "../../components/Course/CourseContent";

type Props = {
  params: Promise<{ id: string }>;
};

export default function Page({ params }: Props) {
  const { id } = React.use(params);

  const { isLoading, error, data } = useLoadUserQuery(undefined, {});

  const router = useRouter();

  React.useEffect(() => {
    if (error) {
      router.replace("/");
      return;
    }

    if (data?.user?.courses) {
      const isPurchased = data.user.courses.some(
        (item: any) => item._id === id,
      );

      if (!isPurchased) router.replace("/");
    }
  }, [data, error, id, router]);

  if (isLoading) return <Loader />;

  return <CourseContent id={id} user={data?.user} />;
}
