import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthContext.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  // AuthProvider is a context provider that provides the authentication context to the app [S.P]
  <AuthProvider>
    <App />
  </AuthProvider>
);
