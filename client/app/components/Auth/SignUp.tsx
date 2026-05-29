"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
  AiOutlineClose,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import { styles } from "@/app/styles/styles";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
  setOpen?: (open: boolean) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password").min(6),
});

const SignUp = ({ setRoute, setOpen }: Props) => {
  const [show, setShow] = useState(false);
  const [register, { data, error, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Registration successful");
      setRoute("Verification");
    }

    if (error && "data" in error) {
      toast.error((error as any).data.message);
    }
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async (values) => {
      await register(values);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full px-4 sm:px-6 py-5 sm:py-6 relative">
      {/* CLOSE BUTTON */}
      {setOpen && (
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black dark:hover:text-white"
        >
          <AiOutlineClose size={20} />
        </button>
      )}

      {/* TITLE */}
      <h1
        className={`${styles.title} text-center sm:text-left text-lg sm:text-xl mb-5`}
      >
        Join to SkillBridge
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* NAME */}
        <div>
          <label className={`${styles.label} text-xs sm:text-sm`}>
            Enter your Name
          </label>

          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="John Doe"
            className={`${styles.input} text-sm sm:text-base`}
          />

          {errors.name && touched.name && (
            <span className="text-red-500 text-[11px] sm:text-sm">
              {errors.name}
            </span>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className={`${styles.label} text-xs sm:text-sm`}>
            Enter your Email
          </label>

          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="loginmail@gmail.com"
            className={`${styles.input} text-sm sm:text-base`}
          />

          {errors.email && touched.email && (
            <span className="text-red-500 text-[11px] sm:text-sm">
              {errors.email}
            </span>
          )}
        </div>

        {/* PASSWORD */}
        <div className="relative">
          <label className={`${styles.label} text-xs sm:text-sm`}>
            Enter your Password
          </label>

          <input
            type={show ? "text" : "password"}
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="password"
            className={`${styles.input} pr-10 text-sm sm:text-base`}
          />

          {show ? (
            <AiOutlineEye
              size={18}
              className="absolute bottom-3 right-3 cursor-pointer"
              onClick={() => setShow(false)}
            />
          ) : (
            <AiOutlineEyeInvisible
              size={18}
              className="absolute bottom-3 right-3 cursor-pointer"
              onClick={() => setShow(true)}
            />
          )}

          {errors.password && touched.password && (
            <span className="text-red-500 text-[11px] sm:text-sm">
              {errors.password}
            </span>
          )}
        </div>

        {/* SUBMIT */}
        <input
          type="submit"
          value="Sign Up"
          className={`${styles.button} text-sm sm:text-base`}
        />

        {/* SOCIAL */}
        <h5 className="text-center text-[12px] sm:text-sm text-black dark:text-white pt-4">
          or join with
        </h5>

        <div className="flex justify-center gap-4">
          <FcGoogle size={28} className="cursor-pointer" />
          <AiFillGithub
            size={28}
            className="cursor-pointer text-black dark:text-white"
          />
        </div>

        {/* LOGIN SWITCH */}
        <h5 className="text-center text-[12px] sm:text-sm text-black dark:text-white">
          Already have an account?{" "}
          <span
            className="text-[#2190ff] cursor-pointer"
            onClick={() => setRoute("Login")}
          >
            Sign in
          </span>
        </h5>
      </form>
    </div>
  );
};

export default SignUp;
