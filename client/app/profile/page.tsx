"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Profile from "../components/Profile/Profile";
import Protected from "../hooks/userProtected";
import Heading from "../utils/Heading";

type Props = {};

const ProfilePage = ({}: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem] = useState(5);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);

  return (
    <Protected>
      <Heading
        title={`${user?.name} Profile - SkillBridge`}
        description="SkillBridge is an online learning platform where students can learn modern skills from expert instructors."
        keywords="SkillBridge, online learning, MERN stack, programming courses, web development"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />
      <Profile user={user} />
    </Protected>
  );
};

export default ProfilePage;
