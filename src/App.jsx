import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/privateRoute/PrivateRoute";
import LoginPage from "./pages/LoginPage/LoginPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import MainLayout from "./layouts/MainLayout/MainLayout";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Redirect to dashboard if user is authenticated [S.P] */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/:auth" element={<LoginPage />} />
          {/* Private route [S.P] */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            }
          >
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="users" element={<UsersPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
