"use client";
import { use } from "react";
import CourseDetailsPage from "../../components/Course/CourseDetailsPage";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return <CourseDetailsPage id={id} />;
}
