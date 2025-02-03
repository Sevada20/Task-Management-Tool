import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "@/pages/DashboardPage/DashboardPage";
import PrivateRoute from "@/routes/privateRoute/PrivateRoute";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import LoginPage from "@/pages/LoginPage/LoginPage";
import UsersPage from "@/pages/UsersPage/UsersPage";

function App() {
  return (
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
          <Route path="dashboard/users" element={<UsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
