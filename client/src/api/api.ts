import {
  IFormData,
  ITask,
  IUser,
  IAuthResponse,
  IApiError,
  ITaskFormData,
} from "@/types";
import axios, { AxiosError, AxiosResponse } from "axios";

const API_URL = "https://client-81t3ps5be-sevada20s-projects.vercel.app";

//Create axios instance
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//Add token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Register user
export const registerUser = async (
  userData: IFormData
): Promise<IAuthResponse> => {
  try {
    const response = await api.post("/auth/register", userData);
    const { token } = response.data;
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.error || "Something went wrong";
  }
};

//Login user
export const loginUser = async (
  userData: IFormData
): Promise<IAuthResponse> => {
  try {
    const response = await api.post("/auth/login", userData);
    const { token } = response.data;
    if (token) {
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.error || "Authentication failed";
    } else {
      throw "Network error occurred";
    }
  }
};

//Get tasks
export const getTasks = async (): Promise<ITask[]> => {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<IApiError>;
    throw axiosError.response?.data || error;
  }
};

//Create task
export const createTask = async (taskData: ITaskFormData): Promise<ITask> => {
  try {
    const response = await api.post("/tasks", taskData);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

//Update task
export const updateTask = async (
  taskId: string,
  updateData: ITaskFormData
): Promise<ITask> => {
  try {
    const response = await api.put(`/tasks/${taskId}`, updateData);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

//Update task status
export const updateTaskStatus = async (
  taskId: string,
  status: string
): Promise<ITask> => {
  try {
    const response: AxiosResponse<ITask> = await api.put(
      `/tasks/${taskId}/status`,
      {
        status,
      }
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<IApiError>;
    throw axiosError.response?.data;
  }
};

//Delete task
export const deleteTask = async (
  taskId: string
): Promise<{ message: string }> => {
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

//Get users
export const getUsers = async (): Promise<IUser[]> => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

//Delete user
export const deleteUser = async (userId: string): Promise<IUser> => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

//Update user
export const updateUser = async (
  userId: string,
  updateData: { role: string; username: string }
): Promise<IUser> => {
  try {
    const response = await api.put(`/users/${userId}`, updateData);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
