import { useQuery } from "@tanstack/react-query";
import { ApiError, ApiGetResponse } from "../types/apiType";
import {
  CategoryResponseData,
  MenuDataResponse,
  OrderResponseData,
  RestaurantResponseData,
  RestaurantResponseDataProfile,
  SingleMenuDataResponse,
  UserProfileResponseData,
} from "../types/contentType";
import { apiGetRequest } from "./adminGetApi";

export const useUserDetails = () => {
  return useQuery<ApiGetResponse<UserProfileResponseData>, ApiError>({
    queryKey: ["user/details"],
    queryFn: async () => {
      return await apiGetRequest<UserProfileResponseData>({
        url: "user/admin-details-info",
      });
    },
  });
};

// generally use in form fo selecting
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

//for actual tabel
export const useCategoriesPagination = (page: number, limit: number) => {
  return useQuery<ApiGetResponse<CategoryResponseData>, ApiError>({
    queryKey: [`categories/${page}`],
    queryFn: async () => {
      return await apiGetRequest<CategoryResponseData>({
        url: `/categories/pag?page=${page}&limit=${limit}`,
      });
    },
  });
};

export const useResturantCategories = () => {
  return useQuery<ApiGetResponse<CategoryResponseData>, ApiError>({
    queryKey: ["Resturant_Category"],
    queryFn: async () => {
      return await apiGetRequest<CategoryResponseData>({
        url: "/restcategory/get",
      });
    },
  });
};
export const useRestCategoriesPagination = (page: number, limit: number) => {
  return useQuery<ApiGetResponse<CategoryResponseData>, ApiError>({
    queryKey: [`restcategory/${page}`],
    queryFn: async () => {
      return await apiGetRequest<CategoryResponseData>({
        url: `/restcategory/pag?page=${page}&limit=${limit}`,
      });
    },
  });
};

//for getting all resturant
export const useRestaurants = () => {
  return useQuery<ApiGetResponse<RestaurantResponseData>, ApiError>({
    queryKey: ["restaurant"],
    queryFn: async () => {
      return await apiGetRequest<RestaurantResponseData>({
        url: "/restaurant/admin",
      });
    },
  });
};

//for getting resturant by pagination
export const useRestaurantsPagination = (page: number, limit: number) => {
  return useQuery<ApiGetResponse<RestaurantResponseData>, ApiError>({
    queryKey: [`restaurant/${page}`],
    queryFn: async () => {
      return await apiGetRequest<RestaurantResponseData>({
        url: `/restaurant/pag?page=${page}&limit=${limit}`,
      });
    },
  });
};

//resturant Owner Routes

export const useResturantOwnerResturants = (page: number, limit: number) => {
  return useQuery<ApiGetResponse<RestaurantResponseData>, ApiError>({
    queryKey: [`resturant/self/${page}`],
    queryFn: async () => {
      return await apiGetRequest<RestaurantResponseData>({
        url: `restaurantowneruser/get/rest?page=${page}&limit=${limit}`,
      });
    },
  });
};

export const useResturantOwnerCategory = () => {
  return useQuery<ApiGetResponse<CategoryResponseData>, ApiError>({
    queryKey: ["restaurantowneruser/get/categories"],
    queryFn: async () => {
      return await apiGetRequest<CategoryResponseData>({
        url: "restaurantowneruser/get/catgeory",
      });
    },
  });
};

export const useResturantOwnerMenu = (
  id: string,
  page: number,
  limit: number
) => {
  return useQuery<ApiGetResponse<MenuDataResponse>, ApiError>({
    queryKey: [`restaurant/${id}/menu?page=${page}&limit=${limit}`],
    queryFn: async () => {
      return await apiGetRequest<MenuDataResponse>({
        url: `restaurantowneruser/get/res/menu/${id}?page=${page}&limit=${limit}`,
      });
    },
  });
};
export const useResturantOwnerMenuById = (id: string) => {
  return useQuery<ApiGetResponse<SingleMenuDataResponse>, ApiError>({
    queryKey: [`restaurant/get/menu/by/${id}`],
    queryFn: async () => {
      return await apiGetRequest<SingleMenuDataResponse>({
        url: `restaurantowneruser/get/menu/${id}`,
      });
    },
  });
};

export const useResturantOwnerDetails = (id: string) => {
  return useQuery<ApiGetResponse<RestaurantResponseDataProfile>, ApiError>({
    queryKey: [`restaurantowneruser/${id}/details`],

    queryFn: async () => {
      return await apiGetRequest<RestaurantResponseDataProfile>({
        url: `restaurantowneruser/get/rest/${id}`,
      });
    },
  });
};

export const useResturantOwnerOrders = (id: string) => {
  return useQuery<ApiGetResponse<OrderResponseData>, ApiError>({
    queryKey: [`rest/order/${id}`],

    queryFn: async () => {
      return await apiGetRequest<OrderResponseData>({
        url: `restaurantowneruser/order/${id}`,
      });
    },
  });
};
