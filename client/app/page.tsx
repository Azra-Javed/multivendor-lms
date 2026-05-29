"use client";

import { useState } from "react";
import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import Heading from "@/app/utils/Heading";
import Courses from "@/app/components/Route/Courses";
import Reviews from "@/app/components/Route/Reviews";
import FAQ from "@/app/components/FAQ/FAQ";
import Footer from "@/app/components/footer";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <>
      <Heading
        title="SkillBridge"
        description="SkillBridge is an online learning platform where students can learn modern skills from expert instructors."
        keywords="SkillBridge, programming, MERN, Redux, machine learning, admin dashboard"
      />
      <Header
        open={open}
        activeItem={activeItem}
        setOpen={setOpen}
        setRoute={setRoute}
        route={route}
      />
      <Hero />
      <Courses />
      <Reviews />
      <FAQ />
      <Footer />
    </>
  );
}
