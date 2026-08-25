export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  city: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  age: number;
  city: string;
}

export type UpdateUserRequest = CreateUserRequest;

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
}

export type ApiResponse<T> =
  | ApiSuccessResponse<T>
  | ApiErrorResponse;