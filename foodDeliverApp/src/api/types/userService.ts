export interface RegisterRequest {
  name: string;
  mobile: number;
  email: string;
  password: string;
}

export interface VerifyOTPRequest {
  email: string;
  otp: number;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface LoginVerifyRequest {
  email: string;
  otp: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface UpdateProfileRequest {
  name: string;
  mobile: number;
  email: string;
  avatar: string;
  dob: string;
  gender: string;
  address: string;
}

export interface UserProfileResponse {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface MenuItem {
  menuItemId: string;
  price: number;
  totalprice: number;
  quantity: number;
}

export interface Coupon {
  couponcode: string;
  percent: number;
  category: string;
}

export interface Payment {
  method: string;
  status: string;
}

export interface OrderData {
  items: MenuItem[];
  coupon: Coupon;
  address: string;
  totalAmount: number;
  payment: Payment;
  orderStatus: string;
}