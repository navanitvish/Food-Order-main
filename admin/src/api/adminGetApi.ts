// src/api/userApi.ts
import { ApiError, ApiGetResponse } from "../types/apiType";
import axiosInstance from "./axiosInstance";

interface ApiGetRequestConfig {
  url: string;
}

export const apiGetRequest = async <TResponse>({
  url,
}: ApiGetRequestConfig): Promise<ApiGetResponse<TResponse>> => {
  try {
    const config = {
      url,
    };

    const response = await axiosInstance.get<TResponse>(url);

    console.log(config, "from get category");
    console.log(response, "Response from apis");
    return {
        ...response
    };
  } catch (error) {
    const errorMessage = (error as ApiError).message || "An error occurred";
    const status = (error as ApiError)?.status;
    throw { message: errorMessage, status } as ApiError;
  }
};
