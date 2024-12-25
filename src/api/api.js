import axios from "axios";

const API_URL = "http://localhost:5000/api";

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
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    const { token } = response.data;
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
    return response.data;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};

//Login user
export const loginUser = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData);
    const { token } = response.data;
    if (token) {
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.error || "Authentication failed";
    } else {
      throw "Network error occurred";
    }
  }
};

//Get tasks
export const getTasks = async () => {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

//Create task
export const createTask = async (taskData) => {
  try {
    const response = await api.post("/tasks", taskData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//Update task
export const updateTask = async (taskId, updateData) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, updateData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//Update task status
export const updateTaskStatus = async (taskId, status) => {
  try {
    const response = await api.put(`/tasks/${taskId}/status`, {
      status,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//Delete task
export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//Get users
export const getUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

//Delete user
export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//Update user
export const updateUser = async (userId, updateData) => {
  try {
    const response = await api.put(`/users/${userId}`, updateData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
