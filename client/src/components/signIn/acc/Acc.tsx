import React, { useState } from "react";

import { IoMdArrowRoundBack } from "react-icons/io";
import { ApiError, ApiResponse } from "../../../types/apiType";
import {
  MutationObjectRegisterType,
  RegisterData,
  RegisterResponse,
  RegisterStateType,
  VisiblePass,
} from "../../../types/authType";
import { apiRequest } from "../../../api/userApi";
import { useMutation } from "@tanstack/react-query";
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiPhone,
  FiUser,
} from "react-icons/fi";
import { toast } from "react-toastify";

interface AccountProps {
  toggleOtp: () => void;
  toggleLogin: () => void;
  exit: () => void;
}

const Acc: React.FC<AccountProps> = ({ toggleLogin, toggleOtp, exit }) => {
  const [register, setUserDetails] = useState<RegisterStateType>({
    name: "",
    email: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
  });

  const [isVisible, setVisible] = useState<VisiblePass>({
    enterPass: false,
    confPass: false,
  });

  const mutation = useMutation<
    ApiResponse<RegisterResponse>,
    ApiError,
    MutationObjectRegisterType
  >({
    mutationFn: async ({ path, method, data }) => {
      toast.loading("Creating account");
      try {
        const response = await apiRequest<RegisterData, RegisterResponse>({
          url: path,
          method: method,
          data,
        });

        console.log(response);
        return response;
      } catch (error) {
        console.log(error);
        throw new Error("Error occurred during Register"); // Handle specific errors if needed
      }
    },
    onSuccess: (data: ApiResponse<RegisterResponse>) => {
      console.log("Login successful:", data);
      toast.dismiss();

      toast.success(`${data?.message}-> Check your Email`);
      toggleOtp();
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

  const handleChnage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    console.log(e.target.value, e.target.name);

    const { name, value, type } = e.target;

    let checked: boolean | undefined;

    if (e.target instanceof HTMLInputElement) {
      checked = e.target.checked;
    }

    // If the input is not a number or is longer than 10 characters, do not update state
    if (!isNaN(Number(value)) && value.length <= 10) {
      setUserDetails((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      // Reset error message
      // setPhoneNumberError("");
    } else if (name !== "contact") {
      setUserDetails((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalObject: RegisterData = {
      name: register.name,
      password: register.password,
      email: register.email,
      mobile: register.phoneNo,
    };
    mutation.mutate({
      path: "user/register",
      method: "post",
      data: finalObject,
    });
    // toggleOtp();
    console.log(finalObject);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={` bg-white h-screen  duration-1000  py-[1rem] px-6 md:px-8`}
      >
        <div className="flex items-center mt-5 mb-2">
          <IoMdArrowRoundBack
            onClick={exit}
            size={23}
            className="cursor-pointer"
          />
          <h1 className="ml-4 text-2xl font-semibold">Sign up</h1>
        </div>
        <p className="mt-5">
          or
          <span
            onClick={toggleLogin}
            className="ml-1 text-blue-600 cursor-pointer"
          >
            login the account
          </span>
        </p>

        <div>
          <label className="block mt-5 font-semibold text-gray-600">Name</label>

          <div className="relative w-full mt-1">
            <FiUser className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 top-1/2 left-2" />
            <input
              className="w-full py-2 transition-all duration-200 border-2 rounded-md outline-none placeholder:text-gray-400 pl-9 focus:border-blue-300"
              id="name"
              type="text"
              placeholder="Enter your Name"
              name="name"
              value={register.name}
              onChange={handleChnage}
              required
            />
          </div>
        </div>
        <div>
          <label className="block mt-5 font-semibold text-gray-600">
            Phone Number
          </label>

          <div className="relative w-full mt-1">
            <FiPhone className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 top-1/2 left-2" />
            <input
              className="w-full py-2 transition-all duration-200 border-2 rounded-md outline-none placeholder:text-gray-400 pl-9 focus:border-blue-300"
              type="number"
              id="phoneNo"
              placeholder="Enter your phone number"
              name="phoneNo"
              value={register?.phoneNo}
              onChange={handleChnage}
              required
            />
          </div>
        </div>
        <div className="mt-5">
          <label className="block font-semibold text-gray-600">Email</label>

          <div className="relative w-full mt-1">
            <FiMail className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 top-1/2 left-2" />
            <input
              className="w-full py-2 transition-all duration-200 border-2 rounded-md outline-none pl-9 placeholder:text-gray-400 focus:border-blue-300"
              id="email"
              type="email"
              placeholder="Enter your e-mail"
              name="email"
              value={register?.email}
              onChange={handleChnage}
              required
            />
          </div>
        </div>

        <div className="mt-5">
          <label className="block font-semibold text-gray-600">Password</label>

          <div className="relative w-full mt-1">
            <FiLock className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 top-1/2 left-2" />
            <input
              className="w-full px-8 py-2 transition-all duration-200 border-2 rounded-md outline-none placeholder:text-gray-400 pl-9 focus:border-blue-300"
              id="password"
              type={`${isVisible.enterPass ? "text" : "password"}`}
              placeholder="Enter your password"
              name="password"
              value={register?.password}
              onChange={handleChnage}
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
        </div>
        <div className="mt-5">
          <label className="block font-semibold text-gray-600">
            Confirm Password
          </label>

          <div className="relative w-full mt-1">
            <FiLock className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 top-1/2 left-2" />
            <input
              className="w-full px-8 py-2 transition-all duration-200 border-2 rounded-md outline-none placeholder:text-gray-400 pl-9 focus:border-blue-300"
              id="confirmPassword"
              type={`${isVisible.confPass ? "text" : "password"}`}
              placeholder="Confirm your password"
              name="confirmPassword"
              value={register?.confirmPassword}
              onChange={handleChnage}
              required
            />
            <button
              className="absolute text-gray-400 -translate-y-1/2 right-4 top-1/2"
              role="button"
              onClick={(e) => {
                e.preventDefault(); // Prevent the default behavior of the button
                setVisible((prev) => ({
                  ...prev,
                  confPass: !prev.confPass,
                })); // Toggle password visibility
              }}
            >
              {isVisible.confPass ? (
                <FiEye className="w-5 h-5" />
              ) : (
                <FiEyeOff className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="mt-5" typeof="submit">
          <button className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Continue
          </button>
        </div>
      </div>
    </form>
  );
};
export default Acc;
