// // src/api/userApi.ts
// import axiosInstance from "./axiosInstance";
// import { ApiError, ApiRequestPromise, User } from "../types";
// import { LoginData } from "../types/authType";
// import { ApiResponse } from "../types/apiType";

// interface ApiRequestConfig<T> {
//   url: string;
//   method: "get" | "post" | "put" | "delete";
//   data?: T;
//   //   headers?: Record<string, string>; // Add headers property
// }

// export const apiRequest = async <T>({
//   url,
//   method,
//   data,
// }: ApiRequestConfig<T>): Promise<ApiResponse<T>> => {
//   // try {
//   //   const response = await axiosInstance({
//   //     url,
//   //     method,
//   //     data,
//   //   });
//   //   return response as ApiResponse<T>;
//   try {
//     const config = {
//       url,
//       method,
//       ...(data && { data }), // Conditionally include data only if it is provided
//     };

//     console.log(config, "from post/put category");

//     const response = await axiosInstance(config);
//     return response as ApiResponse<T>;
//   } catch (error) {
//     // throw new Error(error.response?.data?.message || "An error occurred");
//     const errorMessage = error.response?.data?.message || "An error occurred";
//     const status = error.response?.status;
//     throw { message: errorMessage, status } as ApiError;
//   }
// };

// src/api/userApi.ts
import { ApiError, ApiResponse } from "../types/apiType";
import axiosInstance from "./axiosInstance";

interface ApiRequestConfig<TRequest> {
  url: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  data?: TRequest;
}

export const apiRequest = async <TRequest, TResponse>({
  url,
  method,
  data,
}: ApiRequestConfig<TRequest>): Promise<ApiResponse<TResponse>> => {
  try {
    const config = {
      url,
      method,
      ...(data && { data }), // Conditionally include data only if it is provided
    };

    const response = await axiosInstance(config);

    console.log(config, "from post/put category");
    console.log(response, "Response from apis");
    return response.data;
  } catch (error) {
    const errorMessage = (error as ApiError).message || "An error occurred";
    console.log(errorMessage, error);
    const status = (error as ApiError)?.status;
    throw { message: errorMessage, status } as ApiError;
  }
};
