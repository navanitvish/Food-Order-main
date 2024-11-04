/* eslint-disable no-unused-vars */
import { useState } from "react";

import forgetImg from "../assets/Reset password.svg";
import { useLocation } from "react-router-dom";

import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";

import { toast, ToastContainer } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { ApiError, ApiResponse } from "../types/apiType";
import {
  ForgotUserPasswordData,
  ForgotUserPasswordResponse,
  MutationObjectForgotUserType,
  StateForgotPasswordType,
  VisiblePassType,
} from "../types/authType";
import { apiRequest } from "../api/userApi";

const ForgetPasswordByEmailLink = () => {
  const [forpass, setUserDetails] = useState<StateForgotPasswordType>({
    password: "",
    confirmPassword: "",
  });

  const [isVisible, setVisible] = useState<VisiblePassType>({
    enterPass: false,
    confPass: false,
  });

  const [passwordError, setPassWordError] = useState<string>("");

  const { search } = useLocation();

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  const mutation = useMutation<
    ApiResponse<ForgotUserPasswordResponse>,
    ApiError,
    MutationObjectForgotUserType
  >({
    mutationFn: async ({ path, method, data }) => {
      toast.loading("Checking Passwords");
      try {
        const response = await apiRequest<
          ForgotUserPasswordData,
          ForgotUserPasswordResponse
        >({
          url: path,
          method: method,
          data: data,
        });

        return response;
      } catch (error) {
        console.log(error);
        throw new Error("Error occurred during Reset");
      }
    },
    onSuccess: (data: ApiResponse<ForgotUserPasswordResponse>) => {
      console.log("Reset Successful:", data);
      toast.dismiss();
      toast.success(`Password Reset Successful`);
    },
    onError: (error: ApiError) => {
      console.error("Reset error:", error);
      console.log("Reset error:", error);
      toast.dismiss();
      toast.error(`${error}`);
      // Handle error (e.g., show error message)
    },
  });

  const handlingUserDetails = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;

    setUserDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (name === "confirmPassword" && forpass.password === value) {
      setPassWordError("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (forpass.confirmPassword !== forpass.password) {
      setPassWordError("Passwords do not match");
      return;
    }

    // mutation.mutate(finalObj);
    const finalObject: ForgotUserPasswordData = {
      newPassword: forpass.password,
    };

    mutation.mutate({
      path: `/user/forgot-reset-password?token=${search.slice(7)}`,
      method: "put",
      data: finalObject,
    });
  };

  return (
    <section className="flex md:px-4 max-w-[1200px] mx-auto font-lato">
      {/* <Link
        to={"/"}
        className="fixed top-0 flex items-center gap-1 pt-4  group right-[58px]"
      >
        <span className="group-hover:text-rose-600">Back to home</span>
        <IoMdArrowRoundBack className="transition-all duration-700 rotate-180 group-hover:translate-x-1 group-hover:text-rose-600" />
      </Link> */}
      <ToastContainer />
      <div className="flex-col items-center justify-center hidden h-screen rounded-md md:flex">
        <img
          src={forgetImg}
          alt="forget password image"
          className="w-full h-full"
        />
      </div>
      <div className="flex flex-col items-center justify-center h-screen px-6 mx-auto w-[100%] sm:w-[80%]  lg:w-[40%]">
        <div className="w-full">
          <h4 className="text-[24px] md:text-4xl font-bold text-gray-600">
            Forgot Password!
          </h4>
          <p className="pt-1 text-sm text-gray-600 md:pt-2 md:text-base">
            Create a new password below.!
          </p>
        </div>

        <form
          className="flex flex-col items-center justify-center w-full gap-4 py-4 md:pr-8 "
          onSubmit={handleSubmit}
        >
          <div className="relative w-full">
            <FiLock className="absolute w-5 h-5 text-gray-400 top-[10px] left-2" />
            <input
              className="w-full px-8 py-[6px]  transition-all duration-200 border-2 rounded-md outline-none placeholder:text-gray-400 bg-blue-50 pl-9 focus:border-blue-300"
              name="password"
              type={`${isVisible.enterPass ? "text" : "password"}`}
              placeholder="Enter Password"
              value={forpass.password}
              onChange={handlingUserDetails}
              required
            />
            <button
              className="absolute text-gray-400 right-4 top-[10px]"
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
          <div className="relative w-full">
            <FiLock className="absolute w-5 h-5 text-gray-400 top-[10px] left-2" />
            <input
              className="w-full px-8 py-[6px]  transition-all duration-200 border-2 text-green-800 rounded-md outline-none bg-blue-50 placeholder:text-gray-400 pl-9 focus:border-blue-300"
              name="confirmPassword"
              type={`${isVisible.confPass ? "text" : "password"}`}
              placeholder="Confirm Password"
              value={forpass.confirmPassword}
              onChange={handlingUserDetails}
              required
            />
            <button
              className="absolute text-gray-400 right-4 top-[10px]"
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
            {passwordError && (
              <div className="pt-1 text-sm text-red-500 ">
                {passwordError} !
              </div>
            )}
          </div>

          <div className="flex items-center w-full ">
            <button
              className="px-4 py-2 font-bold text-white bg-blue-400 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgetPasswordByEmailLink;
