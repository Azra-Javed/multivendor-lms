import { Suspense } from "react";
import CoursesClient from "./CoursesClient";
import Loader from "@/app/components/Loader/Loader";

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <CoursesClient />
    </Suspense>
  );
}
