"use client";
import { useState } from "react";
import Header from "../app/components/Header";
import Hero from "../app/components/Hero";
interface Props {}

const page = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <>
      <Header
        open={open}
        activeItem={activeItem}
        setOpen={setOpen}
        setRoute={setRoute}
        route={route}
      />
      <Hero />
    </>
  );
};

export default page;
