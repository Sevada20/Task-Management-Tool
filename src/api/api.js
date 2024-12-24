import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    const { token } = response.data;
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
    return response.data;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    const { token } = response.data;
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
    return response.data;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};

export const getTasks = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createTask = async (taskData) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  try {
    const response = await axios.post(`${API_URL}/tasks`, taskData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateTask = async (taskId, updateData) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${taskId}`, updateData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateTaskStatus = async (taskId, status) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${taskId}/status`, {
      status,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${API_URL}/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      throw new Error("Token not found");
    }
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateUser = async (userId, updateData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}`, updateData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
