// src/api/userApi.ts
// import axiosInstance from "./axiosInstance";

// import { ApiError, ApiResponse } from "../types/apiType";

// export const fetchUsers = async (): Promise<User[]> => {
//   const response = await axiosInstance.get<User[]>("/users");
//   return response.data;
// };

// export const postUser = async (newUser: Omit<User, "id">): Promise<User> => {
//   const response = await axiosInstance.post<User>("/users", newUser);
//   return response.data;
// };

// export const updateUser = async (updatedUser: User): Promise<User> => {
//   const response = await axiosInstance.put<User>(
//     `/users/${updatedUser.id}`,
//     updatedUser
//   );
//   return response.data;
// };

// export const postUser = async (newUser: LoginData): ApiRequestPromise<T> => {
//   const response = await axiosInstance.post<User>("/user/signin", newUser);
//   return response.data;
// };

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
//   try {
//     const response = await axiosInstance({
//       url,
//       method,
//       data,
//     });
//     return response.data as ApiResponse<T>;
//   } catch (error) {
//     console.log(error);
//     // throw new Error(error.response?.data?.message || "An error occurred");
//     const errorMessage = (error as ApiError).message || "An error occurred";
//     const status = (error as ApiError)?.status;
//     throw { message: errorMessage, status: status } as ApiError;
//   }
// };

// // src/api/userApi.ts
import { ApiError, ApiResponse } from "../types/apiType";
import axiosInstance from "./axiosInstance";

interface ApiRequestConfig<TRequest> {
  url: string;
  method: "get" | "post" | "put" | "delete";
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
    const status = (error as ApiError)?.status;
    throw { message: errorMessage, status } as ApiError;
  }
};
