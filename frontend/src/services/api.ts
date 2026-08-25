import axios from "axios";
import type {
  ApiSuccessResponse,
  CreateUserRequest,
  UpdateUserRequest,
  User
} from "../types/user";

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error("VITE_API_URL is not configured.");
}

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json"
  }
});

export const getUsers = async (): Promise<User[]> => {
  const response =
    await api.get<ApiSuccessResponse<User[]>>("/users");

  return response.data.data;
};

export const createUser = async (
  user: CreateUserRequest
): Promise<User> => {
  const response =
    await api.post<ApiSuccessResponse<User>>(
      "/users",
      user
    );

  return response.data.data;
};

export const updateUser = async (
  id: number,
  user: UpdateUserRequest
): Promise<User> => {
  const response =
    await api.put<ApiSuccessResponse<User>>(
      `/users/${id}`,
      user
    );

  return response.data.data;
};

export const deleteUser = async (
  id: number
): Promise<void> => {
  await api.delete(`/users/${id}`);
};

export default api;