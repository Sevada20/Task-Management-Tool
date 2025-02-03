import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthContext.js";
import "./index.css";
import App from "./App.js";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const root = createRoot(rootElement);

root.render(
  // AuthProvider is a context provider that provides the authentication context to the app [S.P]
  <AuthProvider>
    <App />
  </AuthProvider>
);
