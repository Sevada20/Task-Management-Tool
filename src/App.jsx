import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import PrivateRoute from "./routes/privateRoute/PrivateRoute";
import MainLayout from "./layouts/MainLayout/MainLayout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/:auth" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="users" element={<UsersPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
