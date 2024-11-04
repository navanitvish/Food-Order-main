import axios from 'axios';
import { ENDPOINTS } from '../endpoint';
import { 
  ApiResponse, 
  LoginVerifyRequest, 
  RegisterRequest, 
  SignInRequest, 
  UpdateProfileRequest, 
  VerifyOTPRequest,
} from '../types/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://192.168.1.40:4578/api';
const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('userToken');
};

export const userService = {
  register: (data: RegisterRequest) => 
    axios({
      method: 'post',
      url: `${BASE_URL}${ENDPOINTS.REGISTER}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    })
      .then(response => response)
      .catch(error => {
        console.error('Error in register service:', error.response || error);
        throw error;
      }),

  verifyOTP: (data: VerifyOTPRequest) => 
    axios({
      method: 'put',
      url: `${BASE_URL}${ENDPOINTS.VERIFY_OTP}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }),

  signIn: (data: SignInRequest) => 
    axios({
      method: 'post',
      url: `${BASE_URL}${ENDPOINTS.SIGNIN}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }),

  loginVerify: (data: LoginVerifyRequest) => 
    axios({
      method: 'post',
      url: `${BASE_URL}${ENDPOINTS.LOGIN_VERIFY}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }),

  updateProfile: async (formData: any) => {
    const token = await getToken();
    return axios({
      method: 'put',
      url: `${BASE_URL}${ENDPOINTS.UPDATE_USER}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      data: formData
    });
  },

  getProfile: async () => {
    const token = await getToken();
    const config = {
      method: 'get',
      url: `${BASE_URL}${ENDPOINTS.GET_USER_PROFILE}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      }
    };

    console.log('Token:', token);
    console.log('Config:', config);

    return axios(config);
  },

  forgotPassword: (data: any) => 
    axios({
      method: 'post',
      url: `${BASE_URL}${ENDPOINTS.SENT_FORGOT_PASSWORD_OTP}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    })
      .then(response => response)
      .catch(error => {
        console.error('Error in forgot password service:', error.response || error);
        throw error;
      }),

  forgotResetPassword: (data: any) =>
    axios({
      method: 'put',
      url: `${BASE_URL}${ENDPOINTS.RESET_PASSWORD}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    })
      .then(response => response)
      .catch(error => {
        console.error('Error in forgot reset password service:', error.response || error);
        throw error;
      }),
};