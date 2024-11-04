

import { ENDPOINTS } from '../endpoint';
import { OrderData } from '../types/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = 'http://192.168.1.40:4578/api';

export const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('userToken');
};

export const foodService = {
  getAllDishes: async () => {
    const token = await getToken();
    return axios({
      method: 'get',
      url: `${BASE_URL}${ENDPOINTS.GET_ALL_DISHES}`,
      headers: { 
        Authorization: `${token}`,
        'Content-Type': 'application/json'
      }
    });
  },

  filterRestaurantsByCategory: async (categoryIds: string[]) => {
    console.log('categoryIds:', categoryIds);
    const token = await getToken();
    try {
      return axios({
        method: 'get',
        url: `${BASE_URL}${ENDPOINTS.FILTER_BY_CATEGORY}`,
        headers: { 
          Authorization: `${token}`,
          'Content-Type': 'application/json'
        },
        params: { categoryIds: categoryIds.join(',') }
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data);
        console.error('Status:', error.response?.status);
        console.error('Headers:', error.response?.headers);
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  },

  getAllSpecial: async () => {
    const token = await getToken();
    return axios({
      method: 'get',
      url: `${BASE_URL}${ENDPOINTS.GET_SPECIAL}`,
      headers: { 
        Authorization: `${token}`,
        'Content-Type': 'application/json'
      }
    });
  },

  getDishesByRestaurant: async (restaurantId: string) => {
    const token = await getToken();
    return axios({
      method: 'get',
      url: `${BASE_URL}${ENDPOINTS.GET_DISHES_BY_RESTAURANT}/${restaurantId}`,
      headers: { 
        Authorization: `${token}`,
        'Content-Type': 'application/json'
      }
    });
  },

  getDishesByCategory: async (categoryId: string) => {
    console.log('categoryId:', categoryId);
    const token = await getToken();
    return axios({
      method: 'get',
      url: `${BASE_URL}${ENDPOINTS.GET_DISHES_BY_CATEGORY}/${categoryId}`,
      headers: { 
        Authorization: `${token}`,
        'Content-Type': 'application/json'
      }
    });
  },

  getDishesByType: async (type: string) => {
    const token = await getToken();
    return axios({
      method: 'get',
      url: `${BASE_URL}${ENDPOINTS.GET_DISHES_BY_TYPE}/${type}`,
      headers: { 
        Authorization: `${token}`,
        'Content-Type': 'application/json'
      }
    });
  },

  getAllRestaurants: async (selfPickup: boolean = false) => {
    console.log('selfPickup:', selfPickup);
    const token = await getToken();
    const params = selfPickup ? { selfPickup: "pickup" } : {};
    return axios.get(`${BASE_URL}${ENDPOINTS.GET_ALL_RESTAURANTS}`, {
      headers: { 
        Authorization: `${token}`
      },
      params
    });
  },

  getRestaurantById: async (restaurantId: string) => {
    const token = await getToken();
    return axios({
      method: 'get',
      url: `${BASE_URL}${ENDPOINTS.GET_RESTAURANT_BY_ID}/${restaurantId}`,
      headers: { 
        Authorization: `${token}`,
        'Content-Type': 'application/json'
      }
    });
  },

  getAllBanners: async () => {
    const token = await getToken();
    return axios({
      method: 'get',
      url: `${BASE_URL}${ENDPOINTS.GET_BANNER}`,
      headers: { 
        Authorization: `${token}`,
        'Content-Type': 'application/json'
      }
    });
  },

  getFoodCategories: async () => {
    const token = await getToken();
    return axios({
      method: 'get',
      url: `${BASE_URL}${ENDPOINTS.GET_FOOD_CATEGORIES}`,
      headers: { 
        Authorization: `${token}`,
        'Content-Type': 'application/json'
      }
    });
  },

  searchDishes: async (query: string) => {
    console.log('query:', query);
    const token = await getToken();
    return axios({
      method: 'get',
      url: `${BASE_URL}/menus/search/dishes`,
      headers: { 
        Authorization: `${token}`,
        'Content-Type': 'application/json'
      },
      params: { q: query }
    });
  },

// Modify your foodService.createOrder
createOrder: async (orderData: any) => {
  const token = await getToken();
  return axios({
    method: 'post',
    url: `${BASE_URL}${ENDPOINTS.CREATE_ORDER}`,
    headers: { 
      Authorization: token,
    },
    data: orderData,
    // Add timeout and validateStatus
    timeout: 10000,
    validateStatus: (status) => {
      return status >= 200 && status < 300;
    }
  });
},

  getOrdersByStatus: async (status: 'all' | 'active' | 'complete' | 'cancel' | 'pending' = 'all') => {
    const token = await getToken();
    return axios({
      method: 'get',
      url: `${BASE_URL}${ENDPOINTS.GET_ALL_ORDERS}`,
      headers: { 
        Authorization: `${token}`,
        'Content-Type': 'application/json'
      }
    });
  },

  getOrderById: async (orderId: string) => {
    console.log("orderId:", orderId);
    const token = await getToken();
    return axios({
      method: 'get',
      url: `${BASE_URL}${ENDPOINTS.GET_SINGLE_ORDER}/${orderId}`,
      headers: { 
        Authorization: `${token}`,
        'Content-Type': 'application/json'
      }
    });
  },

  addToFavorites: async (menuId: string) => {
    try {
      const token = await getToken();
      return axios({
        method: 'post',
        url: `${BASE_URL}${ENDPOINTS.ADD_TO_FAVOURITES}/${menuId}`,
        headers: { 
          Authorization: `${token}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("API error:", error.response?.data);
        throw error;
      } else {
        console.error("Error:", error);
        throw new Error('An unexpected error occurred');
      }
    }
  },

  addFavoriteRestaurant: async (restaurantId: string) => {
    console.log("restaurantId:", restaurantId);
    try {
      const token = await getToken();
      return axios({
        method: 'post',
        url: `${BASE_URL}${ENDPOINTS.ADD_FAVORITE_RESTAURANT}/${restaurantId}`,
        headers: { 
          Authorization: `${token}`,
          'Content-Type': 'application/json'
        },
        data: {}
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("API error:", error.response?.data);
        throw error;
      } else {
        console.error("Error:", error);
        throw new Error('An unexpected error occurred');
      }
    }
  },

  getReviewsByRating: async (menuId: string, rating: 'all' | 'positive' | 'negative' | number) => {
    try {
      const token = await getToken();
      let params: { rating?: string | number } = {};
      
      if (typeof rating === 'number') {
        params.rating = rating;
      } else if (['all', 'positive', 'negative'].includes(rating)) {
        params.rating = rating;
      } else {
        throw new Error('Invalid rating parameter');
      }

      console.log("menuid is", menuId, params);

      return axios({
        method: 'get',
        url: `${BASE_URL}/review/${menuId}`,
        headers: { 
          Authorization: `${token}`,
          'Content-Type': 'application/json'
        },
        params: params
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // console.error("API error:", error.response?.data);
        // throw error;
      } else {
        console.error("Error:", error);
        throw new Error('An unexpected error occurred');
      }
    }
  },

  searchRestaurantsAndMenuItems: async (query: string) => {
    const token = await getToken();
    try {
      return axios.get(`${BASE_URL}/restaurant/search`, {
        headers: { Authorization: `${token}` },
        params: { search: query }
      });
    } catch (error) {
      console.error('Error searching restaurants and menu items:', error);
      throw error;
    }
  },
  createLocation: async (locationData:any) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      
      // Transform the data to match API requirements
      const payload: any= {
        address: locationData.address,
        tag:locationData.tag,
        addressName: locationData.addressName,
        location: {
          type: "Point",
          coordinates: [locationData.longitude, locationData.latitude] // Note: GeoJSON uses [longitude, latitude] order
        }
      };

      return axios({
        method: 'post',
        url: `${BASE_URL}/location`,
        headers: { 
          Authorization: `${token}`,
          'Content-Type': 'application/json'
        },
        data: payload,
        timeout: 10000,
        validateStatus: (status) => {
          return status >= 200 && status < 300;
        }
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('API error:', error.response?.data);
        throw error;
      } else {
        console.error('Unexpected error:', error);
        throw new Error('An unexpected error occurred while saving location');
      }
    }
  },
  getAllFavorites: async () => {
    const token = await getToken();
    return axios.get(`${BASE_URL}${ENDPOINTS.GET_ALL_FAVORITES}`, {
      headers: { 
        Authorization: `${token}`
      }
    });
  },
  validateOrder: async (restaurantId: string) => {
    const token = await getToken();
    try {
      return axios({
        method: 'get',
        url: `${BASE_URL}/api/order/validation/${restaurantId}`,
        headers: { 
          Authorization: `${token}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data);
        console.error('Status:', error.response?.status);
        console.error('Headers:', error.response?.headers);
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  }
};