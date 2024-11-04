import { useQuery } from "@tanstack/react-query";

import { ApiError, ApiGetResponse } from "../types/apiType";
import { RestaurantResponseData } from "../types/contentType";

import { apiGetRequest } from "../api/adminGetApi";

const useRestaurants = () => {
  return useQuery<ApiGetResponse<RestaurantResponseData>, ApiError>({
    queryKey: ["restaurant"],
    queryFn: async () => {
      return await apiGetRequest<RestaurantResponseData>({
        url: "/restaurant/admin",
      });
    },
  });
};

export default useRestaurants;
