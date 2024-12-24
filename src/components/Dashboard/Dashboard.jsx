import { Box, Typography, Grid, Button } from "@mui/material";
import TaskList from "../TaskList/TaskList";
import styles from "./styles";

const Dashboard = ({
  groupedTasks,
  handleDeleteTask,
  handleUpdateTaskStatus,
  handleOpenCreateTaskModal,
  handleEditTask,
}) => {
  const classes = styles();

  return (
    <Box sx={{ padding: 3 }}>
      <Box className={classes.dashboardHeader}>
        <Typography variant="h4" gutterBottom>
          Task Dashboard
        </Typography>
        <Button
          sx={{ bgcolor: "#1c98b0" }}
          variant="contained"
          color="primary"
          onClick={handleOpenCreateTaskModal}
        >
          Create Task
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" gutterBottom>
            To Do
          </Typography>
          <Box sx={{ borderTop: "3px solid #9c27b0", borderRadius: "8px" }}>
            <TaskList
              handleEditTask={handleEditTask}
              tasks={groupedTasks["To Do"]}
              handleDeleteTask={handleDeleteTask}
              handleUpdateTaskStatus={handleUpdateTaskStatus}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" gutterBottom>
            In Progress
          </Typography>
          <Box sx={{ borderTop: "3px solid #1976d2", borderRadius: "8px" }}>
            <TaskList
              handleEditTask={handleEditTask}
              tasks={groupedTasks["In Progress"]}
              handleDeleteTask={handleDeleteTask}
              handleUpdateTaskStatus={handleUpdateTaskStatus}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" gutterBottom>
            Completed
          </Typography>
          <Box sx={{ borderTop: "3px solid #4caf50", borderRadius: "8px" }}>
            <TaskList
              handleEditTask={handleEditTask}
              tasks={groupedTasks["Completed"]}
              handleDeleteTask={handleDeleteTask}
              handleUpdateTaskStatus={handleUpdateTaskStatus}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
