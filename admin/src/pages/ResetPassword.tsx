import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import resetImg from "../assets/Secure login.svg";

import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";

import {
  MutationObjectUpdateType,
  StateUpdatePasswordErrorType,
  StateUpdatePasswordType,
  UpdatePasswordData,
  UpdatePasswordResponse,
  VisiblePassUpdateType,
} from "../types/authType";
import { ApiError, ApiResponse } from "../types/apiType";
import { apiRequest } from "../api/userApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const ResetPasswordForm: React.FC = () => {
  const [resetPassword, setResetPassword] = useState<StateUpdatePasswordType>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordError, setPassWordError] =
    useState<StateUpdatePasswordErrorType>({
      confirmPasswordMsg: "",
    });

  const [isVisible, setVisible] = useState<VisiblePassUpdateType>({
    oldPass: false,
    enterPass: false,
    confPass: false,
  });

  const navigate = useNavigate();

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

        return response;
      } catch (error) {
        console.log(error);
        throw new Error("Error occurred during login"); // Handle specific errors if needed
      }
    },
    onSuccess: (data: ApiResponse<UpdatePasswordResponse>) => {
      console.log("Password Successfully Change:", data);
      toast.dismiss();
      toast.success(`Password Successfully Change`);
      navigate("/");
      //   returnToHome();
      // Handle success (e.g., redirect to dashboard)
    },
    onError: (error: ApiError) => {
      console.error("Login error:", error);
      console.log("Login error:", error);
      toast.dismiss();
      toast.error(`${error.message}`);
      // Handle error (e.g., show error message)
    },
  });

  const handleChangePassword = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const confirmPassword =
      e.target.name === "confirmPassword" && e.target.value;

    setResetPassword((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (confirmPassword === resetPassword.newPassword) {
      setPassWordError((prev) => ({
        ...prev,
        confirmPasswordMsg: "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (resetPassword.confirmPassword !== resetPassword.newPassword) {
      setPassWordError({
        confirmPasswordMsg: "Password does not match",
      });
      return;
    }

    // toast.loading("Checking Passwords");

    const resetPasswordObj: UpdatePasswordData = {
      oldPassword: resetPassword.oldPassword,
      newPassword: resetPassword.newPassword,
    };

    mutation.mutate({
      path: "user/reset-password",
      method: "put",
      data: resetPasswordObj,
    });

    setResetPassword({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <>
      <div className="flex-col items-center justify-center hidden h-screen rounded-md md:flex">
        <img
          src={resetImg}
          alt="reset password image"
          className="w-full h-full"
        />
      </div>
      <div className="flex flex-col items-center justify-center h-screen px-4 mx-auto w-[100%]  sm:w-[80%]  lg:w-[50%]">
        <div className="w-full lg:pl-8">
          <h4 className="text-[24px] md:text-3xl lg:text-4xl font-bold text-gray-600">
            Reset Password!
          </h4>
          <p className="text-gray-600 md:pt-2">Create a new password!</p>
        </div>

        <form
          className="flex flex-col items-center justify-center w-full py-4 lg:p-8"
          onSubmit={handleSubmit}
        >
          <div className="relative w-full">
            <FiLock className="absolute w-5 h-5 text-gray-400 top-[10px] left-2" />
            <input
              className="w-full px-8 py-[6px] mb-4 transition-all duration-200 border-2 rounded-md outline-none placeholder:text-gray-400 pl-9 bg-blue-50 focus:border-blue-300"
              name="oldPassword"
              type={`${isVisible.oldPass ? "text" : "password"}`}
              placeholder="Enter old password"
              value={resetPassword.oldPassword}
              onChange={handleChangePassword}
              required
            />
            <button
              className="absolute text-gray-400 right-4 top-[10px]"
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
                <FiEye className="w-5 h-5 text-blue-400" />
              ) : (
                <FiEyeOff className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="relative w-full">
            <FiLock className="absolute w-5 h-5 text-gray-400 top-[10px] left-2" />
            <input
              className="w-full px-8 py-[6px] mb-4 transition-all duration-200 border-2 rounded-md outline-none placeholder:text-gray-400 pl-9 bg-blue-50 focus:border-blue-300"
              name="newPassword"
              type={`${isVisible.enterPass ? "text" : "password"}`}
              placeholder="Enter new password"
              value={resetPassword.newPassword}
              onChange={handleChangePassword}
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
                <FiEye className="w-5 h-5 text-blue-400" />
              ) : (
                <FiEyeOff className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="relative w-full mb-4">
            <FiLock className="absolute w-5 h-5 text-gray-400 top-[10px] left-2" />
            <input
              className="w-full px-8 py-[6px]  transition-all duration-200 border-2 rounded-md outline-none bg-blue-50 placeholder:text-gray-400 pl-9 focus:border-blue-300"
              name="confirmPassword"
              type={`${isVisible.confPass ? "text" : "password"}`}
              placeholder="Confirm new password"
              value={resetPassword.confirmPassword}
              onChange={handleChangePassword}
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
                <FiEye className="w-5 h-5 text-blue-400" />
              ) : (
                <FiEyeOff className="w-5 h-5" />
              )}
            </button>
            {passwordError.confirmPasswordMsg && (
              <div className="pt-1 text-sm text-red-500 ">
                {passwordError.confirmPasswordMsg} !
              </div>
            )}
          </div>

          <div className="flex items-center justify-between w-full">
            <button
              className="px-4 py-2 font-bold text-white bg-blue-400 rounded hover:bg-blue-500 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPasswordForm;
