import { Suspense } from "react";
import Loader from "../components/Loader/Loader";
import CoursesClient from "./CourseClient";

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <CoursesClient />
    </Suspense>
  );
}
