import { useMutation } from "@tanstack/react-query";
import React, { ChangeEvent, useState } from "react";
import { ApiError, ApiResponse } from "../types/apiType";
import { apiRequest } from "../api/userApi";
import {
  MutationObjectUpdateType,
  ResetVisiblePass,
  StateUpdatePasswordErrorType,
  StateUpdatePasswordType,
  UpdatePasswordData,
  UpdatePasswordResponse,
} from "../types/authType";
// import { useLocation, useParams } from "react-router";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const [forpass, setUserDetails] = useState<StateUpdatePasswordType>({
    oldPassword: "",
    password: "",
    confirmPass: "",
  });

  const navigate = useNavigate();

  const [isVisible, setVisible] = useState<ResetVisiblePass>({
    oldPass: false,
    enterPass: false,
    confPass: false,
  });

  const [passwordError, setPassWordError] =
    useState<StateUpdatePasswordErrorType>({
      confirmPasswordMsg: "",
    });

  const mutation = useMutation<
    ApiResponse<UpdatePasswordResponse>,
    ApiError,
    MutationObjectUpdateType
  >({
    mutationFn: async ({ path, method, data }) => {
      toast.loading("Checking Details");
      try {
        const response = await apiRequest<
          UpdatePasswordData,
          UpdatePasswordResponse
        >({
          url: path,
          method: method,
          data: data,
        });
        console.log(response, "updatePassword");
        // Assuming apiRequest returns an object with `data`, `status`, etc.
        return response; // Wrap response.data in ApiResponse structure
      } catch (error) {
        console.log(error);
        throw new Error("Error occurred during login"); // Handle specific errors if needed
      }
    },
    onSuccess: (data: ApiResponse<UpdatePasswordResponse>) => {
      console.log("Login successful:", data);
      toast.dismiss();
      toast.success(`Password Successfully Change`);
      navigate("/");
    },
    onError: (error: ApiError) => {
      console.error("Login error:", error);
      console.log("Login error:", error);
      toast.dismiss();
      toast.error(`${error.message}`);
      // Handle error (e.g., show error message)
    },
  });

  const handlingUserDetails = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { value, id } = e.target;

    const confirmPassword = e.target.name === "confirmPass" && e.target.value;
    setUserDetails((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (confirmPassword === forpass.password) {
      setPassWordError((prev) => ({
        ...prev,
        confirmPasswordMsg: "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (forpass.confirmPass !== forpass.password) {
      setPassWordError({
        confirmPasswordMsg: "Password does not match",
      });
      return;
    }
    const finalObject: UpdatePasswordData = {
      oldPassword: forpass.oldPassword,
      newPassword: forpass.password,
    };

    mutation.mutate({
      path: "user/reset-password",
      method: "put",
      data: finalObject,
    });
    console.log(finalObject);

    setUserDetails({
      oldPassword: "",
      password: "",
      confirmPass: "",
    });
  };

  return (
    <section className="max-w-[1200px] h-screen mx-auto flex justify-center items-center">
      <div className="fixed right-4 top-4">
        <Link
          to={"/"}
          className="flex items-center gap-2 hover:text-rose-400 group "
        >
          <span className="text-sm font-semibold">Back Home</span>
          <IoMdArrowRoundBack className="transition-all duration-500 rotate-180 group-hover:translate-x-1" />
        </Link>
      </div>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="">
        <div
          className={` bg-white md:w-[30rem] transition-all duration-1000  py-[1rem] px-6 sm:px-0`}
        >
          <div className="flex items-center mt-5 mb-2">
            {/* <IoMdArrowRoundBack onClick={toggleCorrectPassword} size={23} /> */}
            <h1 className="text-xl font-semibold md:text-2xl ">
              Correct Your Password
            </h1>
          </div>

          <div className="mt-5">
            <label className="block font-semibold text-gray-700">
              Old Password
            </label>

            <div className="relative w-full mt-1">
              <FiLock className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 top-1/2 left-2" />
              <input
                className="w-full px-8 py-2 transition-all duration-200 border-2 rounded-md outline-none placeholder:text-gray-400 pl-9 focus:border-blue-300"
                id="oldPassword"
                name="oldPassword"
                type={`${isVisible.oldPass ? "text" : "password"}`}
                placeholder="Enter your Old Password"
                value={forpass.oldPassword}
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
                    oldPass: !prev.oldPass,
                  })); // Toggle password visibility
                }}
              >
                {isVisible.oldPass ? (
                  <FiEye className="w-5 h-5" />
                ) : (
                  <FiEyeOff className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <div className="mt-5">
            <label className="block font-semibold text-gray-700">
              New Password
            </label>

            <div className="relative w-full mt-1">
              <FiLock className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 top-1/2 left-2" />
              <input
                className="w-full px-8 py-2 transition-all duration-200 border-2 rounded-md outline-none placeholder:text-gray-400 pl-9 focus:border-blue-300"
                id="password"
                name="password"
                type={`${isVisible.enterPass ? "text" : "password"}`}
                placeholder="Enter your password"
                value={forpass.password}
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
          </div>
          <div className="mt-5">
            <label className="block font-semibold text-gray-700">
              Confirm Password
            </label>

            <div className="relative w-full mt-1">
              <FiLock className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 top-1/2 left-2" />
              <input
                className="w-full px-8 py-2 transition-all duration-200 border-2 rounded-md outline-none placeholder:text-gray-400 pl-9 focus:border-blue-300"
                id="confirmPass"
                name="confirmPass"
                type={`${isVisible.confPass ? "text" : "password"}`}
                placeholder="Confirm your Password"
                value={forpass.confirmPass}
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
            {passwordError.confirmPasswordMsg && (
              <div className="pt-1 text-sm text-red-500 ">
                {passwordError.confirmPasswordMsg} !
              </div>
            )}
          </div>
          <div className="mt-6">
            <button
              typeof="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default UpdatePassword;
