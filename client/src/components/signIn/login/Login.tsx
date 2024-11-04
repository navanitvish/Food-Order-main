import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
// import { FaTimes } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useMutation } from "@tanstack/react-query";

import {
  LoginApiResponse,
  LoginData,
  MutationObjectLoginType,
  VisiblePass,
} from "../../../types/authType";
import { ApiError } from "../../../types/apiType";

import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { toast } from "react-toastify";
import { apiRequest } from "../../../api/userApi";

interface LoginProps {
  toggleOtp: () => void;
  toggleAcc: () => void;

  exit: () => void;

  toggleCorrectPassword: () => void;
}

const Login: React.FC<LoginProps> = ({
  // toggleOtp,
  toggleAcc,
  exit,
  toggleCorrectPassword,
}) => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [isVisible, setVisible] = useState<VisiblePass>({
    enterPass: false,
    confPass: false,
  });

  const mutation = useMutation<
    LoginApiResponse,
    ApiError,
    MutationObjectLoginType
  >({
    mutationFn: async ({ path, method, data }) => {
      toast.loading("Checking Details");
      try {
        const response = await apiRequest<LoginData, LoginApiResponse>({
          url: path,
          method: method,
          data: data,
        });

        console.log(response);

        // Assuming apiRequest returns an object with `data`, `status`, etc.
        console.log(response);
        return response; // Wrap response.data in ApiResponse structure
      } catch (error) {
        console.log(error);
        throw new Error("Error occurred during login"); // Handle specific errors if needed
      }
    },
    onSuccess: (data: LoginApiResponse) => {
      console.log("Login successful:", data);

      if (data?.success) {
        localStorage.setItem("userInfo", data?.token ?? "");
      }

      toast.dismiss();
      toast.success(`Login successful`);
      exit();
      // Handle success (e.g., redirect to dashboard)
    },
    onError: (error: ApiError) => {
      console.error("Login error:", error);
      console.log("Login error:", error);
      toast.dismiss();
      toast.error(`${error?.message}`);
      // Handle error (e.g., show error message)
    },
  });

  const handlingUserDetails = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { value, id } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userDetails);

    const requestedData: LoginData = {
      email: userDetails.email,
      password: userDetails.password,
    };
    // mutation.mutate(userDetails);
    mutation.mutate({
      path: "user/signin",
      method: "post",
      data: requestedData,
    });
    // toggleOtp();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div
        className={`bg-white h-screen  duration-1000  py-[1rem] px-6 md:px-8 `}
      >
        <div className="flex items-center mt-5 mb-2">
          <IoMdArrowRoundBack
            onClick={exit}
            size={23}
            className="cursor-pointer"
          />
          <h1 className="ml-4 text-2xl font-semibold">Login</h1>
        </div>
        <p className="mt-5 ">
          or
          <span
            onClick={toggleAcc}
            className="ml-1 text-blue-600 cursor-pointer"
          >
            create an account
          </span>
        </p>

        <div className="w-full">
          <label className="block mt-5 font-semibold text-gray-600">
            Email Address
          </label>

          {/* <input
            type="email"
            id="email"
            name="email"
            onChange={handlingUserDetails}
            className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your Email Address"
            required
          /> */}
          <div className="relative w-full mt-1">
            <FiMail className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 top-1/2 left-2" />
            <input
              className="w-full py-2 transition-all duration-200 border-2 rounded-md outline-none pl-9 placeholder:text-gray-400 focus:border-blue-300"
              id="email"
              type="email"
              placeholder="Enter your e-mail"
              name="email"
              value={userDetails?.email}
              onChange={handlingUserDetails}
              required
            />
          </div>
        </div>
        <div>
          <label className="block mt-5 font-semibold text-gray-600">
            Password
          </label>
          {/* <input
            type="password"
            id="password"
            name="password"
            onChange={handlingUserDetails}
            className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your password"
            required
          /> */}
          <div className="relative w-full mt-1">
            <FiLock className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 top-1/2 left-2" />
            <input
              className="w-full px-8 py-2 transition-all duration-200 border-2 rounded-md outline-none placeholder:text-gray-400 pl-9 focus:border-blue-300"
              id="password"
              type={`${isVisible.enterPass ? "text" : "password"}`}
              placeholder="Enter your password"
              name="password"
              value={userDetails?.password}
              onChange={handlingUserDetails}
              required
            />
            <button
              className="absolute text-gray-400 -translate-y-1/2 right-4 top-1/2"
              role="button"
              onClick={(e) => {
                e.preventDefault(); // Prevent the default behavior of the button
                setVisible((prev) => ({
                  ...prev,
                  enterPass: !prev.enterPass,
                })); // Toggle password visibility
              }}
            >
              {isVisible.enterPass ? (
                <FiEye className="w-5 h-5" />
              ) : (
                <FiEyeOff className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="flex justify-end w-full mt-1 font-montserrat">
            <span
              onClick={toggleCorrectPassword}
              className="ml-1 text-sm text-blue-600 cursor-pointer"
            >
              Forgot password
            </span>
            {/* or
            <Link
              to={"forgot-password"}
              className="ml-1 text-sm text-blue-600 cursor-pointer"
            >
              Update password
            </Link> */}
          </p>
        </div>
        <div className="mt-4">
          <button
            // onClick={toggleOtp}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Login
          </button>
        </div>
        <p>
          By clicking the login accepting
          <span onClick={() => navigate("/terms")}>
            the terms & conditions & privacy policy
          </span>
        </p>
      </div>
    </form>
  );
};
export default Login;

// import React from "react";
// import { FaTimes } from "react-icons/fa";

// interface LoginProps {
//     toggleSidebar: () => void;
//     state: boolean; // Assuming `state` controls the visibility of the login form
// }

// const Login: React.FC<LoginProps> = ({ toggleSidebar, state }) => {
//     return (
//         <div className={`fixed z-40 inset-0 bg-black/30 flex justify-end  duration-1000 `}>
//             {/* Conditionally apply styles based on `state` */}
//             <div className={`fixed top-9 bg-white h-[30rem] lg:w-[30rem] w-[10rem] duration-1000 px-10 ${state ? 'translate-x-0' : 'translate-x-full'} `}>
//                 <FaTimes onClick={toggleSidebar} size={23} />
//                 <h2 className="mt-5 text-2xl font-semibold">Login</h2>
//                 <p className="mt-5">or create an account</p>
//                 <div>
//                     <label className="block mt-5 font-semibold text-gray-700">
//                         Phone Number
//                     </label>
//                     <input
//                         type="tel"
//                         id="phone"
//                         name="phone"
//                         className="mt-1 block w-[320px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
//                         placeholder="Enter your phone number"
//                     />
//                 </div>
//                 <div className="mt-4">
//                     <button className="bg-blue-500 w-[320px] text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
//                         Login
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Login;
