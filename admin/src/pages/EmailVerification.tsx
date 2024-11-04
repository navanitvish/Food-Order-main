import { useState } from "react";

import forgetImg from "../assets/Secure login.svg";
import { useNavigate } from "react-router-dom";

import { FiMail } from "react-icons/fi";
import { BiMessageDots } from "react-icons/bi";
import { useMutation } from "@tanstack/react-query";
import { MutationObjectOtpType, OtpData, OtpResponse } from "../types/authType";
import { ApiError, ApiResponse } from "../types/apiType";
import { apiRequest } from "../api/userApi";
import { toast } from "react-toastify";

const EmailVerification = () => {
  const [userOtp, setUserDetails] = useState({
    email: "",
    otp: 0,
  });

  const mutation = useMutation<
    ApiResponse<OtpResponse>,
    ApiError,
    MutationObjectOtpType
  >({
    mutationFn: async ({ path, method, data }) => {
      toast.loading("Checking OTP");
      try {
        const response = await apiRequest<OtpData, OtpResponse>({
          url: path,
          method: method,
          data: data,
        });

        return response;
      } catch (error) {
        console.log(error);
        throw new Error("Error occurred during login"); // Handle specific errors if needed
      }
    },
    onSuccess: (data: ApiResponse<OtpResponse>) => {
      console.log("Let's Sign In:", data);
      toast.dismiss();
      toast.success(data.message);
      navigate("/login");
      // Handle success (e.g., redirect to dashboard)
    },
    onError: (error: ApiError) => {
      console.error("check", error);
      console.log("check:", error);
      toast.dismiss();
      toast.error(`Check OTP and Email`);
      // Handle error (e.g., show error message)
    },
  });

  const navigate = useNavigate();

  const handlingUserDetails = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, id } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleVerifyOTP = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userOtpData = {
      email: userOtp.email,
      otp: +userOtp.otp,
    };

    mutation.mutate({
      path: "user/verify-otp",
      method: "put",
      data: userOtpData,
    });
    console.log(userOtp);
  };

  return (
    <>
      <div className="flex-col items-center justify-center hidden h-screen rounded-md md:flex">
        <img src={forgetImg} alt="Email otp image" className="w-full h-full" />
      </div>
      <div className="flex flex-col items-center justify-center h-screen px-6 mx-auto md:w-1/2">
        <div className="w-full ">
          <h4 className="text-[24px] md:text-3xl lg:text-4xl font-bold text-gray-600">
            Received OTP on Email!
          </h4>
          <p className="pt-1 text-gray-600 md:pt-2">
            Please put OTP Which received on email!
          </p>
        </div>
        <form onSubmit={handleVerifyOTP} className="w-full">
          <div className="flex flex-col items-center justify-center py-8 ">
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
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
              <div className="relative w-full mt-1">
                <BiMessageDots className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 top-1/2 left-2" />
                <input
                  className="w-full py-2 pr-2 transition-all duration-200 border-2 rounded-md outline-none pl-9 placeholder:text-gray-400 focus:border-blue-300"
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
            <button
              className="w-full px-4 py-2 mt-6 text-white bg-blue-400 rounded focus:outline-none"
              type="submit"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EmailVerification;
