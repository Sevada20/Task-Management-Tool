import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  createTask,
  getUsers,
  getTasks,
  deleteTask,
  updateTask,
  updateTaskStatus,
} from "@/api/api";
import { api } from "@/api/api";
import { AuthContext } from "@/context/AuthContext";
import {
  Typography,
  Button,
  Box,
  Grid,
  Card,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";

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

  const handleCloseErrorModal = () => {
    setOpenErrorModal(false);
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

  const handleShowDeleteTaskModal = (taskId) => {
    if (user.role === "Admin") {
      handleDeleteTask(taskId);
    } else {
      setTaskError(
        "You do not have permission to delete this task. Only administrators can perform this operation."
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
              <Typography variant="h6" gutterBottom>
                Dashboard Overview
              </Typography>
              <Box sx={{ marginTop: "1rem" }}>
                <Dashboard
                  handleEditTask={handleEditTask}
                  groupedTasks={groupedTasks}
                  user={user}
                  tasks={tasks}
                  handleDeleteTask={handleShowDeleteTaskModal}
                  handleUpdateTaskStatus={handleUpdateTaskStatus}
                  handleOpenCreateTaskModal={handleShowCreateTaskModal}
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
        onClose={handleCloseErrorModal}
      />
    </>
  );
};

export default DashboardPage;
