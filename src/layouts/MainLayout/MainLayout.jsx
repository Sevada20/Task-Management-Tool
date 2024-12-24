import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import styles from "./styles";
import ErrorModal from "../../components/ErrorModal/ErrorModal";

const MainLayout = () => {
  const classes = styles();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleViewUsers = () => {
    if (user?.role !== "Admin" && user?.role !== "Manager") {
      setErrorMessage(
        "Access denied: only administrators and managers can view the user list."
      );
      return;
    }
    navigate("users");
  };

  const handleCloseErrorModal = () => {
    setErrorMessage(null);
  };

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            className={classes.appBarTitle}
            variant="h6"
            component={Link}
            to="/dashboard"
          >
            Dashboard
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1" sx={{ marginRight: 2, color: "#fff" }}>
              Welcome, <strong>{user?.username}</strong>! (Role: {user?.role})
            </Typography>
            <Button
              className={classes.logoutButton}
              color="inherit"
              onClick={handleViewUsers}
            >
              View Users
            </Button>
            <Button
              className={classes.logoutButton}
              color="inherit"
              onClick={logout}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet />
      <ErrorModal
        message={errorMessage}
        onClose={handleCloseErrorModal}
        open={!!errorMessage}
      />
    </Box>
  );
};

export default MainLayout;
