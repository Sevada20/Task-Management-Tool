import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import styles from "./styles";
import ErrorModal from "@/components/ErrorModal/ErrorModal";

const MainLayout = () => {
  const classes = styles();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewUsers = () => {
    if (user?.role !== "Admin" && user?.role !== "Manager") {
      setErrorMessage(
        "Access denied: only administrators and managers can view the user list."
      );
      return;
    }
    navigate("users");
    handleClose();
  };

  const handleLogout = () => {
    logout();
    handleClose();
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
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
              marginRight: 2,
              fontSize: { xs: "1.1rem", sm: "1.25rem" },
              whiteSpace: { xs: "normal", sm: "nowrap" },
              lineHeight: { xs: "1.2", sm: "normal" },
            }}
          >
            Task Management System
          </Typography>

          {isMobile ? (
            <Box>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Box
                  sx={{
                    bgcolor: "rgba(0, 0, 0, 0.04)",
                    py: 1,
                    px: 2,
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    {user?.username}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user?.role}
                  </Typography>
                </Box>

                <MenuItem onClick={handleViewUsers}>View Users</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="body1"
                sx={{ marginRight: 2, color: "#fff" }}
              >
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
          )}
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
