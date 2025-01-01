import { IAuthContextType, IUser } from "@/types";
import { createContext, useState } from "react";

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContextType>({
  user: null,
  login: (token: string, userData: IUser) => {},
  logout: () => {},
  isAuth: false,
});

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [isAuth, setIsAuth] = useState(() => !!localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (token: string, userData: IUser): void => {
    try {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setIsAuth(true);
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const logout = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
