import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { ApiError, ApiResponse } from "../types/apiType";
import { apiRequest } from "../api/userApi";
import {
  ForgotUserPasswordData,
  ForgotUserPasswordResponse,
  MutationObjectForgotUserType,
  StateForgotPasswordType,
  VisiblePass,
} from "../types/authType";
import { useLocation, useNavigate } from "react-router";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";

const ForgotPassword = () => {
  const [forpass, setUserDetails] = useState<StateForgotPasswordType>({
    password: "",
    confirmPassword: "",
  });

  const [isVisible, setVisible] = useState<VisiblePass>({
    enterPass: false,
    confPass: false,
  });

  const [passwordError, setPassWordError] = useState<string>("");

  const { search } = useLocation();
  const navigate = useNavigate();

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
          data,
        });

        // Assuming apiRequest returns an object with `data`, `status`, etc.
        return response; // Wrap response.data in ApiResponse structure
      } catch (error) {
        console.log(error);
        throw new Error("Error occurred during Reset"); // Handle specific errors if needed
      }
    },
    onSuccess: (data: ApiResponse<ForgotUserPasswordResponse>) => {
      console.log("Reset successful:", data);
      toast.dismiss();
      toast.success(`Password Reset Successful`);
      setTimeout(() => navigate("/"), 1000);

      //   returnToHome();
      // Handle success (e.g., redirect to dashboard)
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
    const finalObject: ForgotUserPasswordData = {
      newPassword: forpass.password,
    };

    mutation.mutate({
      path: `/user/forgot-reset-password?token=${search.slice(7)}`,
      method: "put",
      data: finalObject,
    });
    console.log(finalObject);
  };

  return (
    <section className="max-w-[1200px] h-screen mx-auto flex justify-center items-center">
      <form onSubmit={handleSubmit} className="">
        <div
          className={` bg-white lg:w-[30rem] w-[20rem] duration-1000  py-[1rem] px-10`}
        >
          <div className="flex items-center mt-5 mb-2">
            {/* <IoMdArrowRoundBack onClick={toggleCorrectPassword} size={23} /> */}
            <h1 className="text-2xl font-semibold ">Forgot Password!</h1>
          </div>
          <ToastContainer />
          <div className="mt-5">
            <label className="block font-semibold text-gray-700">
              Password
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
                id="confirmPassword"
                name="confirmPassword"
                type={`${isVisible.enterPass ? "text" : "password"}`}
                placeholder="Confirm your Password"
                value={forpass.confirmPassword}
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

              {passwordError && (
                <div className="pt-1 text-sm text-red-500 ">
                  {passwordError} !
                </div>
              )}
            </div>
          </div>
          <div className="mt-4">
            <button
              typeof="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ForgotPassword;
