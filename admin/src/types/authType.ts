// src/types/types.ts

//Login Type
// Login request post payload
export interface LoginData {
  email: string;
  password: string;
}
//Login response type
export interface LoginApiResponse {
  success?: boolean;
  message?: string;
  token?: string;
}

//mutation of login
export interface MutationObjectLoginType {
  path: string;
  method: "post";
  data: LoginData;
}

//Register Type
// Register request payload
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  mobile: string;
}

//mutation of Register
export interface MutationObjectRegisterType {
  path: string;
  method: "post";
  data: RegisterData;
}

export interface RegisterResponseChildData {
  name?: string;
  email?: string;
  password?: string;
  mobile?: string;
  isVerified?: boolean;
  otp: string;
  role?: string;
  _id?: string;
  registrationDate: string;
}

//type data which will come after register
//register response type
export interface RegisterResponse {
  success: boolean;
  message: string;
  data: RegisterResponseChildData;
}

//register state type
export interface RegisterStateType {
  fullName: string;
  contact: string;
  email: string;
  password: string;
  confirmPassword: string;
}

//password hide and show state type
export interface VisiblePassType {
  enterPass: boolean;
  confPass: boolean;
}

//OTP types
// OTP verification payload
export interface OtpData {
  otp: number;
  email: string;
}

export interface MutationObjectOtpType {
  path: string;
  method: "put";
  data: OtpData;
}

// {
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njk5NWViYzJkODZkMWNmZGMyN2ZlODUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjEzMjg5ODEsImV4cCI6MTcyMTQxNTM4MX0.zWsIE7t0wMGaAM4utReCfDLb2GkP-TtvCSzaJkOK0ZA",
//   "success": true,
//   "message": "Email verified successfully"
// }

export interface OtpResponse {
  success: boolean;
  message: string;
  token: string;
}

//Forgot password email put type
// Forgot password payload
export interface ForgotPasswordData {
  email: string;
}
export interface MutationObjectForgotType {
  path: string;
  method: "post";
  data: ForgotPasswordData;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

//forgot password by email link
//request data
export interface ForgotUserPasswordData {
  newPassword: string;
}

export interface MutationObjectForgotUserType {
  path: string;
  method: "put";
  data: ForgotUserPasswordData;
}

//response data
export interface ForgotUserPasswordResponse {
  success: boolean;
  message: string;
}

//state type for forgot user password by email link
export interface StateForgotPasswordType {
  password: string;
  confirmPassword: string;
}

//update type

//request data
export interface UpdatePasswordData {
  oldPassword: string;
  newPassword: string;
}

export interface MutationObjectUpdateType {
  path: string;
  method: "put";
  data: UpdatePasswordData;
}

//response data
export interface UpdatePasswordResponse {
  success: boolean;
  message: string;
}

//state type for update password
export interface StateUpdatePasswordType {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
//state type for Error update password
export interface StateUpdatePasswordErrorType {
  confirmPasswordMsg: string;
}

//password hide and show state type for update state
export interface VisiblePassUpdateType {
  oldPass: boolean;
  enterPass: boolean;
  confPass: boolean;
}
