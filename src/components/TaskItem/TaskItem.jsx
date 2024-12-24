import { useState } from "react";
import { formatDate } from "@/utils/dateUtils";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Modal,
} from "@mui/material";
import styles from "./styles";

const TaskItem = ({
  task,
  handleDeleteTask,
  handleUpdateTaskStatus,
  handleEditTask,
}) => {
  const classes = styles();
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleOpen = (content) => {
    setModalContent(content);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <Card className={classes.taskItemContainer}>
      <CardContent sx={{ flex: 1 }}>
        <Typography
          variant="h6"
          className={classes.title}
          sx={{ fontWeight: "bold" }}
        >
          {task.title.length > 30
            ? `${task.title.slice(0, 30)}... `
            : task.title}
          {task.title.length > 30 && (
            <span
              className={classes.readMoreTitle}
              onClick={() => handleOpen("title")}
            >
              {open && modalContent === "title" ? "Close" : "Read More"}
            </span>
          )}
        </Typography>
        <Typography
          variant="body2"
          sx={{ marginBottom: "0.5rem" }}
          className={classes.description}
        >
          Description:{" "}
          {task.description.length > 50
            ? `${task.description.slice(0, 50)}... `
            : task.description}
          {task.description.length > 50 && (
            <span
              className={classes.readMore}
              onClick={() => handleOpen("description")}
            >
              {open && modalContent === "description" ? "Close" : "Read More"}
            </span>
          )}
        </Typography>
        <Modal open={open} onClose={handleClose}>
          <Box className={classes.modalContainer}>
            <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
              {modalContent === "title" ? "Title" : "Description"}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: "1rem" }}>
              {modalContent === "title" ? task.title : task.description}
            </Typography>
            <Button
              className={classes.closeButton}
              variant="contained"
              onClick={handleClose}
            >
              Close
            </Button>
          </Box>
        </Modal>
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
            onClick={() => handleUpdateTaskStatus(task._id, "In Progress")}
            color="primary"
            variant="contained"
          >
            Set To In Progress
          </Button>
        )}
        {task.status === "In Progress" && (
          <>
            <Button
              onClick={() => handleUpdateTaskStatus(task._id, "To Do")}
              variant="contained"
              color="secondary"
            >
              Set Back To Do
            </Button>
            <Button
              onClick={() => handleUpdateTaskStatus(task._id, "Completed")}
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
              onClick={() => handleUpdateTaskStatus(task._id, "To Do")}
              variant="contained"
              color="secondary"
            >
              Set Back To Do
            </Button>
            <Button
              onClick={() => handleUpdateTaskStatus(task._id, "In Progress")}
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
            backgroundColor: "#1C98B0",
          }}
          onClick={() => handleEditTask(task._id, task._id)}
        >
          Edit Task
        </Button>
        <Button
          className={classes.deleteButton}
          variant="outlined"
          color="error"
          onClick={() => handleDeleteTask(task._id)}
        >
          Delete Task
        </Button>
      </Box>
    </Card>
  );
};

export default TaskItem;
