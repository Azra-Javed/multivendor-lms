// "use client";

import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { ReactNode, useEffect } from "react";
import Loader from "./Loader";

// import { ReactNode, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
// import Loader from "./Loader";

// interface Props {
//   children: ReactNode;
// }

// export default function UserLoader({ children }: Props) {
//   const router = useRouter();
//   const { data: user, isLoading } = useLoadUserQuery({});
//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     setReady(true);

//     // Redirect to home if user is loaded but not authenticated
//     if (ready && !isLoading && !user) {
//       router.replace("/"); // client-side redirect
//     }
//   }, [ready, isLoading, user, router]);

//   // Show loader while loading or before ready
//   if (!ready || isLoading || !user) return <Loader />;

//   return <>{children}</>;
// }
const UserLoader = ({ children }: { children: ReactNode }) => {
  const { isLoading } = useLoadUserQuery({});

  return <>{isLoading ? <Loader /> : <div>{children}</div>}</>;
};

export default UserLoader;
