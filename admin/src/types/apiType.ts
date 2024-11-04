// Define a generic type for API response data
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

// Define a generic type for API error response
export interface ApiError {
  message: string;
  status: number;
}

export interface ApiGetResponse<T> {
  data?: T;
}

// Define a type for the API request promise
export type ApiRequestPromise<T> = Promise<ApiResponse<T>>;
