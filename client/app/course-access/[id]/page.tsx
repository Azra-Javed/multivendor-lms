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
        (item: any) => item._id === id
      );

      if (!isPurchased) router.replace("/");
    }
  }, [data, error, id, router]);

  if (isLoading) return <Loader />;

  return <CourseContent id={id} user={data?.user} />;
}

// "use client";
// import CourseContent from "@/app/components/Course/CourseContent";
// import Loader from "@/app/components/Loader/Loader";
// import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
// import { redirect } from "next/navigation";
// import React, { useEffect } from "react";

// type Props = {
//   params: any;
// };

// const Page = ({ params }: Props) => {
//   const id = params.id;
//   const { isLoading, error, data, refetch } = useLoadUserQuery(undefined, {});

//   useEffect(() => {
//     if (data) {
//       const isPurchased = data.user.courses.find(
//         (item: any) => item._id === id
//       );
//       if (!isPurchased) {
//         redirect("/");
//       }
//     }
//     if (error) {
//       redirect("/");
//     }
//   }, [data, error]);

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div>
//           <CourseContent id={id} user={data.user} />
//         </div>
//       )}
//     </>
//   );
// };

// export default Page;
