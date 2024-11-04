import { useQuery } from "@tanstack/react-query";

import { apiGetRequest } from "../api/adminGetApi";
import { ApiError, ApiGetResponse } from "../types/apiType";
import { CategoryResponseData } from "../types/contentType";

export const useCategories = () => {
  return useQuery<ApiGetResponse<CategoryResponseData>, ApiError>({
    queryKey: ["categories"],
    queryFn: async () => {
      return await apiGetRequest<CategoryResponseData>({
        url: "/categories/get",
      });
    },
  });
};
