import React, { useState } from "react";

import { IoMdArrowRoundBack } from "react-icons/io";

import { apiRequest } from "../../../api/userApi";
import {
  MutationObjectOtpType,
  OtpApiResponse,
  OtpData,
} from "../../../types/authType";
import { ApiError } from "../../../types/apiType";
import { useMutation } from "@tanstack/react-query";
import { FiMail } from "react-icons/fi";
import { BiMessageDots } from "react-icons/bi";
import { toast } from "react-toastify";

interface OtpProps {
  toggleOtp: () => void;

  returnToHome: () => void;
}

const Otp: React.FC<OtpProps> = ({ toggleOtp, returnToHome }) => {
  const [userOtp, setUserDetails] = useState({
    email: "",
    otp: 0,
  });

  const mutation = useMutation<OtpApiResponse, ApiError, MutationObjectOtpType>(
    {
      mutationFn: async ({ path, method, data }) => {
        toast.loading("Checking OTP");
        try {
          const response = await apiRequest<OtpData, OtpApiResponse>({
            url: path,
            method: method,
            data: data,
          });
          console.log(response);
          // Assuming apiRequest returns an object with `data`, `status`, etc.
          return response; // Wrap response.data in ApiResponse structure
        } catch (error) {
          console.log(error);
          throw new Error("Error occurred during login"); // Handle specific errors if needed
        }
      },
      onSuccess: (data: OtpApiResponse) => {
        console.log("Login successful:", data);
        if (data?.success) {
          localStorage.setItem("userInfo", data?.token ?? "");
        }
        toast.dismiss();
        toast.success(`Succefull Sign-In`);
        returnToHome();
        // Handle success (e.g., redirect to dashboard)
      },
      onError: (error: ApiError) => {
        console.error("Login error:", error);
        console.log("Login error:", error);
        toast.dismiss();
        toast.error(`Check OTP and Email`);
        // Handle error (e.g., show error message)
      },
    }
  );

  const handlingUserDetails = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, id } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // mutation.mutate(userOtp);

    const otpReqData: OtpData = {
      otp: userOtp.otp,
      email: userOtp.email,
    };
    mutation.mutate({
      path: "user/verify-otp",
      method: "put",
      data: otpReqData,
    });
    console.log(userOtp);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={` bg-white h-screen  duration-1000  py-[1rem] px-6 md:px-8`}
      >
        <div className="flex items-center mt-5 mb-2">
          <IoMdArrowRoundBack
            onClick={toggleOtp}
            size={23}
            className="cursor-pointer"
          />
          <h1 className="ml-4 text-2xl font-semibold">OTP</h1>
        </div>
        <div className="w-full">
          <label className="block mt-5 font-semibold text-gray-700">
            Email Address
          </label>

          <div className="relative w-full mt-1">
            <FiMail className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 top-1/2 left-2" />
            <input
              className="w-full py-2 transition-all duration-200 border-2 rounded-md outline-none pl-9 placeholder:text-gray-400 focus:border-blue-300"
              id="email"
              type="email"
              placeholder="Enter your e-mail"
              name="email"
              value={userOtp?.email}
              onChange={handlingUserDetails}
              required
            />
          </div>
        </div>
        <div>
          <label className="block mt-5 font-semibold text-gray-700">
            One Time password
          </label>

          <div className="relative w-full mt-1">
            <BiMessageDots className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 top-1/2 left-2" />
            <input
              className="w-full py-2 transition-all duration-200 border-2 rounded-md outline-none pl-9 placeholder:text-gray-400 focus:border-blue-300"
              type="number"
              id="otp"
              name="otp"
              placeholder="Enter your OTP"
              value={userOtp?.otp || ""}
              onChange={handlingUserDetails}
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            typeof="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Verify OTP
          </button>
        </div>
      </div>
    </form>
  );
};
export default Otp;
