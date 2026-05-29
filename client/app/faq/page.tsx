"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import FAQ from "../components/FAQ/FAQ";
import Footer from "../components/footer";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(4);
  const [route, setRoute] = useState("Login");

  return (
    <div className="min-h-screen">
      <Heading
        title={`SkillBridge - FAQ`}
        description="SkillBridge is an online learning platform where students can learn modern skills from expert instructors."
        keywords="SkillBridge, online learning, MERN stack, programming courses, web development"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <br />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Page;
