import axios, { BASE_URL } from '../axios';
import { ENDPOINTS } from '../endpoint';
import { ApiResponse } from '../types/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => AsyncStorage.getItem('userToken');

export const couponService = {
  getAllCoupons: async () => 
    axios.get<ApiResponse>(`${BASE_URL}${ENDPOINTS.GET_COUPONS}`, {
      headers: { Authorization: await getToken() }
    }),
    
  getCouponById: async (id: string) =>
    axios.get<ApiResponse>(`${BASE_URL}${ENDPOINTS.GET_COUPONS}/${id}`, {
      headers: { Authorization: await getToken() }
    }) 
};