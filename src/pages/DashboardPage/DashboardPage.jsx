import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import {
  createTask,
  getUsers,
  getTasks,
  deleteTask,
  updateTask,
  updateTaskStatus,
  api,
} from "@/api/api";
import {
  Typography,
  Button,
  Box,
  Grid,
  Card,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TaskForm from "@/components/TaskForm/TaskForm";
import Dashboard from "@/components/Dashboard/Dashboard";
import ErrorModal from "@/components/ErrorModal/ErrorModal";
import TaskUpdateForm from "@/components/TaskUpdateForm/TaskUpdateForm";
import styles from "./styles";

const DashboardPage = () => {
  const classes = styles();
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskError, setTaskError] = useState(null);
  const [userError, setUserError] = useState(null);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false);
  const [openUpdateTaskModal, setOpenUpdateTaskModal] = useState(false);

  const { user, logout } = useContext(AuthContext);

  const groupedTasks = {
    "To Do": tasks.filter((task) => task.status === "To Do"),
    "In Progress": tasks.filter((task) => task.status === "In Progress"),
    Completed: tasks.filter((task) => task.status === "Completed"),
  };

  //Fetch tasks [S.P]
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        if (!api.defaults.headers.common["Authorization"]) {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

        const data = await getTasks();
        if (user?.role === "User") {
          setTasks(data.filter((task) => task.assignedTo._id === user.id));
        } else {
          setTasks(data);
        }
      } catch (err) {
        console.error("Fetch tasks error:", err);
        setTaskError(err.message || "Failed to fetch tasks");
        setOpenErrorModal(true);

        if (err.message === "Invalid token") {
          logout();
        }
      }
    };

    if (user) {
      fetchTasks();
    }
  }, [user]);

  //Fetch users [S.P]
  useEffect(() => {
    const getUsersData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
        setUserError(error.message || "Failed to fetch users");
        setOpenErrorModal(true);
      }
    };
    getUsersData();
  }, []);

  //handle function for button "Edit Task" in TaskItem [S.P]
  const handleEditTask = (taskId) => {
    const task = tasks.find((task) => task._id === taskId);
    if (user.role === "User") {
      setTaskError(
        "You do not have permission to update tasks. Only administrators and managers can perform this operation."
      );
      setOpenErrorModal(true);
    } else if (task && (user.role === "Manager" || user.role === "Admin")) {
      setOpenUpdateTaskModal(true);
      setSelectedTask(task);
    }
  };

  //async function for button "Update Task" in TaskUpdateForm [S.P]
  const handleUpdateTask = async (taskId, updatedTask) => {
    try {
      const updatedData = await updateTask(taskId, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? updatedData : task))
      );
      setOpenUpdateTaskModal(false);
    } catch (error) {
      console.error(error);
      setTaskError(error.message || "Failed to update task");
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setOpenCreateTaskModal(false);
    } catch (error) {
      console.error(error);
      if (error.error === "Access denied") {
        setTaskError(
          "You do not have permission to create tasks. Only administrators and managers can perform this operation."
        );
        setOpenErrorModal(true);
      } else {
        setTaskError(error.message || "Failed to create task");
      }
    }
  };

  //async function change only status of task [S.P]
  const handleUpdateTaskStatus = async (taskId, status) => {
    try {
      const updatedTask = await updateTaskStatus(taskId, status);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? updatedTask : task))
      );
    } catch (error) {
      console.error(error);
      setTaskError(error.message || "Failed to update task status");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      if (error.error === "Access denied") {
        setTaskError(
          "You do not have permission to delete this task. Only administrators can perform this operation."
        );
        console.error(error);
        setOpenErrorModal(true);
      } else {
        console.error(error);
        setTaskError(error.error || "Failed to delete task");
      }
    }
  };

  const handleShowCreateTaskModal = () => {
    if (user.role === "Manager" || user.role === "Admin") {
      setOpenCreateTaskModal(true);
    } else {
      setTaskError(
        "You do not have permission to create tasks. Only administrators and managers can perform this operation."
      );
      setOpenErrorModal(true);
    }
  };

  return (
    <>
      <Box sx={{ padding: "2rem", marginTop: "2rem" }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card className={classes.dashboardCard}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" gutterBottom>
                  Dashboard Overview
                </Typography>
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleShowCreateTaskModal}
                    startIcon={<AddIcon />}
                    className={classes.createTaskButton}
                    style={{ backgroundColor: "#1c98b0" }}
                  >
                    Create New Task
                  </Button>
                </Box>
              </Box>
              <Box sx={{ marginTop: "1rem" }}>
                <Dashboard
                  groupedTasks={groupedTasks}
                  handleDeleteTask={handleDeleteTask}
                  handleUpdateTaskStatus={handleUpdateTaskStatus}
                  handleEditTask={handleEditTask}
                  user={user}
                />
              </Box>
            </Card>
          </Grid>

          <Dialog
            open={openCreateTaskModal}
            onClose={() => setOpenCreateTaskModal(false)}
          >
            <DialogContent>
              <TaskForm onSubmit={handleCreateTask} users={users} />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOpenCreateTaskModal(false)}
                color="secondary"
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openUpdateTaskModal}
            onClose={() => setOpenUpdateTaskModal(false)}
          >
            <DialogContent>
              <TaskUpdateForm
                handleUpdateTask={handleUpdateTask}
                task={selectedTask}
                users={users}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOpenUpdateTaskModal(false)}
                color="secondary"
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Box>
      <ErrorModal
        message={taskError}
        open={openErrorModal}
        onClose={() => setOpenErrorModal(false)}
      />
    </>
  );
};

export default DashboardPage;
