// "use client";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import {
//   AiOutlineEye,
//   AiOutlineEyeInvisible,
//   AiFillGithub,
// } from "react-icons/ai";
// import { FcGoogle } from "react-icons/fc";
// import { useEffect, useState } from "react";
// import { styles } from "@/app/styles/styles";
// import { useLoginMutation } from "@/redux/features/auth/authApi";
// import toast from "react-hot-toast";
// import { signIn } from "next-auth/react";

// type Props = {
//   setRoute: (route: string) => void;
//   setOpen: (open: boolean) => void;
//   refetch?: any;
// };

// const schema = Yup.object().shape({
//   email: Yup.string()
//     .email("Invalid email")
//     .required("Please enter your email!"),
//   password: Yup.string().required("Please enter your password").min(6),
// });

// const Login = ({ setRoute, setOpen, refetch }: Props) => {
//   const [show, setShow] = useState(false);
//   const [login, { isSuccess, error, data }] = useLoginMutation();

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success("Login Successfully!");
//       setOpen(false);
//       refetch();
//     }
//     if (error) {
//       if ("data" in error) {
//         const errorData = error as any;
//         toast.error(errorData.data.message);
//       }
//     }
//   }, [isSuccess, error]);

//   const formik = useFormik({
//     initialValues: { email: "", password: "" },
//     validationSchema: schema,
//     onSubmit: async ({ email, password }) => {
//       await login({ email, password });
//     },
//   });

//   const { errors, touched, values, handleChange, handleSubmit } = formik;

//   return (
//     <>
//       <div className="w-full">
//         <h1 className={`${styles.title}`}>Login with Elearning</h1>
//         <form onSubmit={handleSubmit}>
//           <label className={`${styles.label}`} htmlFor="email">
//             Enter your Email
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={values.email}
//             onChange={handleChange}
//             id="email"
//             placeholder="loginmail@gmail.com"
//             className={`${errors.email && touched.email && "border-red-500"} ${
//               styles.input
//             }`}
//           />
//           {errors.email && touched.email && (
//             <span className="text-red-500 pt-2 block">{errors.email}</span>
//           )}
//           <div className="w-full mt-5 relative mb-1">
//             <label className={`${styles.label}`} htmlFor="password">
//               Enter your Password
//             </label>
//             <input
//               type={!show ? "password" : "text"}
//               name="password"
//               value={values.password}
//               onChange={handleChange}
//               id="password"
//               placeholder="password!@%"
//               className={`${
//                 errors.password && touched.password && "border-red-500"
//               } ${styles.input}`}
//             />
//             {!show ? (
//               <AiOutlineEyeInvisible
//                 className="absolute bottom-3 right-2 z-1 cursor-pointer"
//                 size={20}
//                 onClick={() => setShow(true)}
//               />
//             ) : (
//               <AiOutlineEye
//                 className="absolute bottom-3 right-2 z-1 cursor-pointer"
//                 size={20}
//                 onClick={() => setShow(false)}
//               />
//             )}
//             {errors.password && touched.password && (
//               <span className="text-red-500 pt-2 block">{errors.password}</span>
//             )}
//           </div>

//           <div className="w-full mt-5">
//             <input type="submit" value="Login" className={`${styles.button}`} />
//           </div>
//           <br />
//           <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
//             or join with
//           </h5>
//           <div className="flex items-center justify-center my-3">
//             <FcGoogle
//               size={30}
//               className="cursor-pointer mr-2"
//               onClick={() => signIn("google")}
//             />
//             <AiFillGithub
//               size={30}
//               className="cursor-pointer ml-2"
//               onClick={() => signIn("github")}
//             />
//           </div>
//           <h5 className="text-center pt-4 font-Poppins text-[14px]">
//             Not have any account?{" "}
//             <span
//               className="text-[#2190ff] pl-1 cursor-pointer"
//               onClick={() => setRoute("Sign-Up")}
//             >
//               Sign up
//             </span>
//           </h5>
//           <br />
//         </form>
//       </div>
//     </>
//   );
// };

// export default Login;

"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
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
      if (refetch) {
        refetch();
      }
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
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

  // Fixed: Added async/await and proper error handling for social auth
  const handleSocialAuth = async (provider: string) => {
    try {
      const result = await signIn(provider, {
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.error) {
        toast.error(`${provider} login failed. Please try again.`);
        console.error(`${provider} auth error:`, result.error);
      } else if (result?.ok) {
        toast.success(`Logged in with ${provider} successfully!`);
        setOpen(false);
        if (refetch) {
          refetch();
        }
      }
    } catch (error) {
      console.error(`${provider} authentication error:`, error);
      toast.error(`Failed to authenticate with ${provider}`);
    }
  };

  return (
    <>
      <div className="w-full">
        <h1 className={`${styles.title}`}>Login with Elearning</h1>
        <form onSubmit={handleSubmit}>
          <label className={`${styles.label}`} htmlFor="email">
            Enter your Email
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="loginmail@gmail.com"
            className={`${errors.email && touched.email && "border-red-500"} ${
              styles.input
            }`}
          />
          {errors.email && touched.email && (
            <span className="text-red-500 pt-2 block">{errors.email}</span>
          )}
          <div className="w-full mt-5 relative mb-1">
            <label className={`${styles.label}`} htmlFor="password">
              Enter your Password
            </label>
            <input
              type={!show ? "password" : "text"}
              name="password"
              value={values.password}
              onChange={handleChange}
              id="password"
              placeholder="password!@%"
              className={`${
                errors.password && touched.password && "border-red-500"
              } ${styles.input}`}
            />
            {!show ? (
              <AiOutlineEyeInvisible
                className="absolute bottom-3 right-2 z-1 cursor-pointer dark:text-white text-black"
                size={20}
                onClick={() => setShow(true)}
              />
            ) : (
              <AiOutlineEye
                className="absolute bottom-3 right-2 z-1 cursor-pointer dark:text-white text-black"
                size={20}
                onClick={() => setShow(false)}
              />
            )}
            {errors.password && touched.password && (
              <span className="text-red-500 pt-2 block">{errors.password}</span>
            )}
          </div>

          <div className="w-full mt-5">
            <input type="submit" value="Login" className={`${styles.button}`} />
          </div>
          <br />
          <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
            or join with
          </h5>
          <div className="flex items-center justify-center my-3 gap-4">
            <button
              type="button"
              onClick={() => handleSocialAuth("google")}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Sign in with Google"
            >
              <FcGoogle size={30} className="cursor-pointer" />
            </button>
            <button
              type="button"
              onClick={() => handleSocialAuth("github")}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Sign in with GitHub"
            >
              <AiFillGithub
                size={30}
                className="cursor-pointer dark:text-white text-black"
              />
            </button>
          </div>
          <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
            Not have any account?{" "}
            <span
              className="text-[#2190ff] pl-1 cursor-pointer hover:underline"
              onClick={() => setRoute("Sign-Up")}
            >
              Sign up
            </span>
          </h5>
          <br />
        </form>
      </div>
    </>
  );
};

export default Login;
