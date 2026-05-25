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
import { useLoginMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
  refetch?: any;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password").min(6),
});

const Login = ({ setRoute, setOpen, refetch }: Props) => {
  const [show, setShow] = useState(false);
  const [login, { isSuccess, error }] = useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successfully!");
      setOpen(false);
      if (refetch) refetch();
    }
    if (error && "data" in error) {
      toast.error((error as any).data.message);
    }
  }, [isSuccess, error, setOpen, refetch]);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  const handleSocialAuth = async (provider: string) => {
    try {
      const result = await signIn(provider, {
        redirect: false,
        callbackUrl: "/",
      });

      // only show error if actual error exists
      if (result?.error) {
        toast.error(`${provider} login failed`);
        return;
      }

      // success
      if (result?.ok || result?.url) {
        toast.success(`Logged in with ${provider}`);
        setOpen(false);
        refetch?.();
      }
    } catch {
      toast.error(`Failed to login with ${provider}`);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 py-5 sm:py-6 relative">
      {/* CLOSE BUTTON */}
      <button
        onClick={() => setOpen(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-black dark:hover:text-white"
      >
        <AiOutlineClose size={20} />
      </button>

      {/* TITLE */}
      <h1
        className={`${styles.title} text-center sm:text-left text-lg sm:text-xl mb-5`}
      >
        Login with Elearning
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
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
              className="absolute bottom-3 right-3 cursor-pointer"
              size={18}
              onClick={() => setShow(false)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-3 cursor-pointer"
              size={18}
              onClick={() => setShow(true)}
            />
          )}

          {errors.password && touched.password && (
            <span className="text-red-500 text-[11px] sm:text-sm">
              {errors.password}
            </span>
          )}
        </div>

        {/* BUTTON */}
        <input
          type="submit"
          value="Login"
          className={`${styles.button} text-sm sm:text-base`}
        />

        {/* SOCIAL */}
        <h5 className="text-center text-[12px] sm:text-sm text-black dark:text-white">
          or join with
        </h5>

        <div className="flex justify-center gap-4">
          <button type="button" onClick={() => handleSocialAuth("google")}>
            <FcGoogle size={26} />
          </button>

          <button type="button" onClick={() => handleSocialAuth("github")}>
            <AiFillGithub size={26} />
          </button>
        </div>

        {/* SIGNUP */}
        <h5 className="text-center text-[12px] sm:text-sm text-black dark:text-white">
          Not have an account?{" "}
          <span
            className="text-[#2190ff] cursor-pointer"
            onClick={() => setRoute("Sign-Up")}
          >
            Sign up
          </span>
        </h5>
      </form>
    </div>
  );
};

export default Login;
