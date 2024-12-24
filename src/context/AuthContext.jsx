import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsAuth(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuth(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
