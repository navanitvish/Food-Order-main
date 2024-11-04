import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ApiError, ApiResponse } from "../../../types/apiType";
import {
  ForgotPasswordData,
  ForgotPasswordResponse,
  MutationObjectForgotType,
} from "../../../types/authType";
import { apiRequest } from "../../../api/userApi";
import { FiMail } from "react-icons/fi";
import { toast } from "react-toastify";

interface ConfirmProps {
  toggleCorrectPassword: () => void;

  exit: () => void;
}

const CorrectPassword: React.FC<ConfirmProps> = ({ toggleCorrectPassword }) => {
  const [email, setEmail] = useState<string>("");

  const mutation = useMutation<
    ApiResponse<ForgotPasswordResponse>,
    ApiError,
    MutationObjectForgotType
  >({
    mutationFn: async ({ path, method, data }) => {
      toast.loading("Checking Email");
      try {
        const response = await apiRequest<
          ForgotPasswordData,
          ForgotPasswordResponse
        >({
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
    onSuccess: (data: ApiResponse<ForgotPasswordResponse>) => {
      console.log("Login successful:", data);
      toast.dismiss();
      toast.success(`Check your Email`);
      //   returnToHome();
      // Handle success (e.g., redirect to dashboard)
    },
    onError: (error: ApiError) => {
      console.error("Login error:", error);
      console.log("Login error:", error);
      toast.dismiss();
      toast.error("Please put correct Email");
      // Handle error (e.g., show error message)
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const finalObj: ForgotPasswordData = {
      email: email,
    };

    mutation.mutate({
      path: "user/forgot-password",
      method: "post",
      data: finalObj,
    });

    setEmail("");
    // toggleCorrectPassword();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={` bg-white h-screen  duration-1000  py-[1rem] px-6 md:px-8`}
      >
        <div className="flex items-center mt-5 mb-2">
          <IoMdArrowRoundBack
            onClick={toggleCorrectPassword}
            size={23}
            className="cursor-pointer"
          />
          <h1 className="ml-4 text-2xl font-semibold">Reset Password!</h1>
        </div>

        <div className="mt-5">
          <label className="block font-semibold text-gray-700">Email</label>

          <div className="relative w-full mt-1">
            <FiMail className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 top-1/2 left-2" />
            <input
              className="w-full py-2 transition-all duration-200 border-2 rounded-md outline-none pl-9 placeholder:text-gray-400 focus:border-blue-300"
              id="email"
              type="email"
              placeholder="Enter your Email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <button
            typeof="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Continue
          </button>
        </div>
      </div>
    </form>
  );
};

export default CorrectPassword;
