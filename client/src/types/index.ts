export interface IUser {
  _id: string;
  id: string;
  username: string;
  role: "Admin" | "Manager" | "User";
}

export interface IAuthContextType {
  user: IUser | null;
  login: (token: string, user: IUser) => void;
  logout: () => void;
  isAuth: boolean;
}

export interface ITask {
  _id: string;
  __v: number;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
  dueDate: string;
  assignedTo: IUser;
}

export interface ITaskFormData {
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  assignedTo?: string;
}

export interface IFormData {
  username: string;
  password: string;
  role?: "Admin" | "Manager" | "User";
}

export interface IAuthResponse {
  message?: string;
  token: string;
  user: IUser;
}

export interface IApiError {
  error: string;
  message?: string;
}
