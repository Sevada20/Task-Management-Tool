import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteUser, getUsers, updateUser } from "@/api/api";
import { AuthContext } from "@/context/AuthContext";
import { Card, Typography, Box, Grid, Button } from "@mui/material";
import UserItem from "@/components/UserItem/UserItem";
import ErrorModal from "@/components/ErrorModal/ErrorModal";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorModal, setErrorModal] = useState(false);

  const { user: currentUser } = useContext(AuthContext);

  //Fetch users [S.P]
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleMenuClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(selectedUser._id);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== selectedUser._id)
      );
    } catch (error) {
      setError("Failed to delete user", error);
    }
    handleCloseMenu();
  };

  const handleRoleChange = async (role) => {
    try {
      await updateUser(selectedUser._id, {
        role,
        username: selectedUser.username,
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === selectedUser._id ? { ...user, role } : user
        )
      );
    } catch (error) {
      setError("Failed to update user role", error);
    }
    handleCloseMenu();
  };

  if (currentUser?.role === "User") {
    return (
      <Box sx={{ padding: "2rem", marginTop: "2rem" }}>
        <Typography variant="h4">
          Access Denied - Only administrators and managers can view the user
          list
        </Typography>
        <Link component={Link} to="/dashboard">
          <Button
            style={{ marginTop: "2rem", backgroundColor: "#1c98b0" }}
            variant="contained"
            color="primary"
          >
            Go to Dashboard
          </Button>
        </Link>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ padding: "2rem", marginTop: "2rem" }}>
        <Typography variant="h4">Loading users...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "2rem", marginTop: "2rem" }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card sx={{ padding: "1rem" }}>
            <Typography variant="h6" gutterBottom>
              Users List
            </Typography>
            <Box padding={2} sx={{ marginTop: "1rem" }}>
              {users.length ? (
                users.map((user) => (
                  <UserItem
                    key={user._id}
                    user={user}
                    anchorEl={anchorEl}
                    handleMenuClick={handleMenuClick}
                    handleCloseMenu={handleCloseMenu}
                    handleRoleChange={handleRoleChange}
                    handleDeleteUser={handleDeleteUser}
                    currentUser={currentUser}
                    setErrorModal={setErrorModal}
                    setError={setError}
                  />
                ))
              ) : (
                <Typography>No users found</Typography>
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>
      <ErrorModal
        open={errorModal}
        onClose={() => setErrorModal(false)}
        message={error}
      />
    </Box>
  );
};

export default UsersPage;
