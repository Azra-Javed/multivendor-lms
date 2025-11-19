"use client";
import { use, useState } from "react";
import Protected from "../hooks/useAuth";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";

type Props = {};
const page = ({}: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);

  return (
    <>
      <Protected>
        <Heading
          title={`${user.name}/profile`}
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Prograaming,MERN,Redux,Machine Learning"
        />
        <Header
          open={open}
          activeItem={activeItem}
          setOpen={setOpen}
          setRoute={setRoute}
          route={route}
        />
        <Profile user={user} />
      </Protected>
    </>
  );
};

export default page;
