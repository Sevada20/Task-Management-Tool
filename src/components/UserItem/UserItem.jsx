import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import styles from "./styles";

const UserItem = ({
  user,
  anchorEl,
  handleMenuClick,
  handleCloseMenu,
  handleRoleChange,
  handleDeleteUser,
  currentUser,
  setErrorModal,
  setError,
}) => {
  const classes = styles();

  // function to change user role [S.P]
  const handleManageClick = (event, user) => {
    if (currentUser?.role !== "Admin") {
      setErrorModal(true);
      setError(
        "You do not have permission to manage users. Only administrators can perform this operation."
      );
    } else {
      handleMenuClick(event, user);
    }
  };

  return (
    <Box className={classes.userItem} key={user._id}>
      <Box>
        <Typography variant="body1">{user.username}</Typography>
        <Typography variant="body2">Role: {user.role}</Typography>
      </Box>
      <Box>
        <Button
          onClick={(event) => handleManageClick(event, user)}
          variant="outlined"
          size="small"
        >
          Manage
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          {["Manager", "User"].map((role) => (
            <MenuItem key={role} onClick={() => handleRoleChange(role)}>
              Make {role}
            </MenuItem>
          ))}
          <MenuItem onClick={handleDeleteUser}>Delete User</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default UserItem;
