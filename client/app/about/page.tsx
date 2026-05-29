"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import About from "./About";
import Footer from "../components/footer";

type Props = {};

const page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(2);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="SkillBridge - About"
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
      <About />
      <Footer />
    </div>
  );
};

export default page;
