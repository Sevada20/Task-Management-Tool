import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import styles from "./styles";
import { IUser } from "@/types";

interface IUserItemProps {
  user: IUser;
  anchorEl: null | HTMLElement;
  handleMenuClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    user: IUser
  ) => void;
  handleCloseMenu: () => void;
  handleRoleChange: (role: "Manager" | "User" | "Admin") => void;
  handleDeleteUser: () => void;
  currentUser: IUser | null;
  setErrorModal: (error: boolean) => void;
  setError: (error: string) => void;
}

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
}: IUserItemProps) => {
  const classes = styles();

  // function to change user role [S.P]
  const handleManageClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    user: IUser
  ) => {
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
            <MenuItem
              key={role}
              onClick={() => handleRoleChange(role as "Manager" | "User")}
            >
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
