import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { formatDate } from "@/utils/dateUtils";
import styles from "./styles";

const TaskItem = ({ task, onDelete, onStatusUpdate, handleEditTask }) => {
  const classes = styles();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDeleteClick = (event) => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    onDelete(task._id);
    setOpenDeleteDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const handleEditTaskClick = () => {
    handleEditTask(task._id);
  };

  return (
    <>
      <Card className={classes.taskCard}>
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6" className={classes.title}>
            {task.title}
          </Typography>
          <Typography variant="body2" className={classes.description}>
            {task.description}
          </Typography>
          <Typography
            variant="caption"
            sx={{ display: "block", marginBottom: "0.5rem" }}
          >
            Priority: {task.priority} | Due: {formatDate(task.dueDate)}
          </Typography>
          <Typography
            variant="caption"
            sx={{ fontWeight: "600", color: "#3f51b5" }}
          >
            Assigned To: {task?.assignedTo?.username}
          </Typography>
        </CardContent>
        <Box className={classes.actionButtonContainer} p={2}>
          {task.status === "To Do" && (
            <Button
              onClick={() => onStatusUpdate(task._id, "In Progress")}
              color="primary"
              variant="contained"
            >
              Set To In Progress
            </Button>
          )}
          {task.status === "In Progress" && (
            <>
              <Button
                onClick={() => onStatusUpdate(task._id, "To Do")}
                variant="contained"
                color="secondary"
              >
                Set Back To Do
              </Button>
              <Button
                onClick={() => onStatusUpdate(task._id, "Completed")}
                variant="contained"
                color="success"
              >
                Set To Complete
              </Button>
            </>
          )}
          {task.status === "Completed" && (
            <>
              <Button
                onClick={() => onStatusUpdate(task._id, "To Do")}
                variant="contained"
                color="secondary"
              >
                Set Back To Do
              </Button>
              <Button
                onClick={() => onStatusUpdate(task._id, "In Progress")}
                variant="contained"
                color="primary"
              >
                Set To In Progress
              </Button>
            </>
          )}
          <Button
            className={classes.editButton}
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#1c98b0",
              "&:hover": {
                backgroundColor: "#137a91",
              },
            }}
            onClick={handleEditTaskClick}
          >
            Edit Task
          </Button>
          <Button
            className={classes.deleteButton}
            variant="outlined"
            color="error"
            onClick={handleDeleteClick}
          >
            Delete Task
          </Button>
        </Box>
      </Card>

      <Dialog
        open={openDeleteDialog}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Delete Task"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this task? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskItem;
