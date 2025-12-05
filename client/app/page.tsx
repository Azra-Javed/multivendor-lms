// "use client";
// import { useState } from "react";
// import Heading from "./utils/Heading";
// import Header from "./components/Header";
// import Hero from "./components/Hero";
// import Courses from "./components/Route/Courses";
// import FAQ from "./components/FAQ/FAQ";
// import Reviews from "./components/Route/Reviews";
// import Footer from "./components/footer";
// interface Props {}

// const page = () => {
//   const [open, setOpen] = useState(false);
//   const [activeItem, setActiveItem] = useState(0);
//   const [route, setRoute] = useState("Login");

//   return (
//     <>
//       <Heading
//         title="ELearning"
//         description="ELearning is a platform for students to learn and get help from teachers"
//         keywords="Prograaming,MERN,Redux,Machine Learning"
//       />
//       <Header
//         open={open}
//         activeItem={activeItem}
//         setOpen={setOpen}
//         setRoute={setRoute}
//         route={route}
//       />
//       <Hero />
//       <Courses />
//       <Reviews />
//       <FAQ />
//       <Footer />
//     </>
//   );
// };

// export default page;

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
        title="ELearning"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux, Machine Learning"
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
