import { ChangeEvent, useState } from "react";

import loginImg from "../assets/login.svg";

import { Link, useNavigate } from "react-router-dom";

import { FiEye, FiEyeOff, FiLock, FiUser } from "react-icons/fi";

import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { ApiError } from "../types/apiType";
import {
  LoginApiResponse,
  LoginData,
  MutationObjectLoginType,
} from "../types/authType";
import { apiRequest } from "../api/userApi";

const Login: React.FC = () => {
  const [loginObj, setLoginObj] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [isVisible, setVisible] = useState<boolean>(false);

  const navigate = useNavigate();

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
        //if response is sucess

        return response; // Wrap response.data in ApiResponse structure
      } catch (error) {
        console.log(error);
        throw new Error("Error occurred during login"); // Handle specific errors if needed
      }
    },
    onSuccess: (data: LoginApiResponse) => {
      // setLoginObj({
      //   email: "",
      //   password: "",
      // });
      toast.dismiss();
      toast.success(data.message);
      console.log("Login successful:", data);
      if (data?.success && data.token) {
        localStorage.setItem("admin", data?.token ? data?.token : "");
      }

      // Handle success (e.g., redirect to dashboard)

      setTimeout(() => navigate("/"), 2000);
    },
    onError: (error: ApiError) => {
      console.error("Login error:", error.message);
      console.log("Login error:", error);
      toast.dismiss();
      toast.error(`${error.message}`);

      // Handle error (e.g., show error message)
    },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, type, value, checked } = e.target as HTMLInputElement;
    setLoginObj((prev: LoginData) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login ID:", loginObj.email);
    console.log("Password:", loginObj.password);

    const loginObjectData: LoginData = {
      email: loginObj.email,
      password: loginObj.password,
    };

    mutation.mutate({
      path: "user/signin-admin",
      method: "post",
      data: loginObjectData,
    });
  };
  return (
    <>
      <div className="flex-col items-center justify-center hidden h-screen rounded-md md:flex">
        <img src={loginImg} alt="login image" className="w-[80%] h-[80%]" />
      </div>
      <div className="flex flex-col items-center justify-center h-screen px-4 mx-auto  w-[100%]  sm:w-[80%] md:w-[50%]  lg:w-[40%]">
        <div className="">
          <h4 className="text-[24px] md:text-3xl lg:text-4xl font-bold pb-2 text-gray-600">
            Log in to your Account
          </h4>
          <p className="text-sm font-medium text-gray-600 sm:text-base">
            Welcome back! Please Login to continue
          </p>
        </div>
        <form
          className="flex flex-col items-center justify-center w-full py-4 lg:p-8"
          onSubmit={handleSubmit}
        >
          <div className="relative w-full">
            <FiUser className="absolute w-5 h-5 text-gray-400 top-[10px] left-2" />
            <input
              className="w-full py-[6px] mb-4 transition-all duration-200 border-2 rounded-md outline-none bg-blue-50 placeholder:text-gray-400 pl-9 focus:border-blue-300"
              onChange={handleChange}
              value={loginObj.email}
              name="email"
              type="email"
              required
              placeholder="Email"
            />
          </div>
          <div className="relative w-full mb-4 lg:mb-6">
            <FiLock className="absolute w-5 h-5 text-gray-400 top-[10px] left-2" />
            <input
              className="w-full px-8 py-[6px]  bg-blue-50 transition-all duration-200 border-2 rounded-md outline-none placeholder:text-gray-400 pl-9 focus:border-blue-300"
              onChange={handleChange}
              value={loginObj.password}
              name="password"
              type={`${isVisible ? "text" : "password"}`}
              required
              placeholder="Password"
            />
            <button
              className="absolute text-gray-400 right-4 top-[10px]"
              role="button"
              onClick={(e) => {
                e.preventDefault();
                setVisible((prev) => !prev);
              }}
            >
              {isVisible ? (
                <FiEye className="w-5 h-5 text-blue-400" />
              ) : (
                <FiEyeOff className="w-5 h-5 " />
              )}
            </button>
          </div>

          <div className="grid w-full pb-2">
            <p className="flex flex-col pb-4 lg:pb-8 justify-self-end">
              <Link
                to="/login/reset-password"
                className="text-blue-400 text-sm border-b border-transparent hover:border-blue-500 hover:text-blue-600 transition-all duration-500  w-[fit-content]"
              >
                Forgot Your Password ?
              </Link>
            </p>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-400 border rounded-md disabled:bg-gray-600 hover:bg-sky-400"
            >
              Login
            </button>
          </div>
          <div className="mt-2 text-sm ">
            <span className="text-gray-700">Don't have account ?</span>
            <Link
              to={"/login/register"}
              className="ml-2 text-blue-400  border-b border-transparent   hover:text-blue-600 transition-all duration-500  w-[fit-content]"
            >
              Create a Account
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
