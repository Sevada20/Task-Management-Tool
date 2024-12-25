import { DragDropContext } from "react-beautiful-dnd";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import {
  Box,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import TaskList from "../TaskList/TaskList";
import styles from "./styles";

const Dashboard = ({
  groupedTasks,
  handleDeleteTask,
  handleUpdateTaskStatus,
  handleEditTask,
}) => {
  const classes = styles();
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const { user } = useContext(AuthContext);

  const canUseFilters = user?.role === "Admin" || user?.role === "Manager";

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    handleUpdateTaskStatus(draggableId, destination.droppableId);
  };

  const filterTasks = (tasks) => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter;
      return matchesSearch && matchesPriority;
    });
  };

  return (
    <Box className={classes.dashboard}>
      {!canUseFilters && (
        <Typography variant="body2" mb={1} color="textSecondary">
          Only Admins and Managers can use filters.
        </Typography>
      )}
      <Box className={classes.filters}>
        <TextField
          disabled={!canUseFilters}
          label="Search tasks"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={classes.searchField}
        />
        <FormControl size="small" className={classes.filterSelect}>
          <InputLabel>Priority</InputLabel>
          <Select
            disabled={!canUseFilters}
            value={priorityFilter}
            label="Priority"
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <MenuItem value="all">All Priorities</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={2}>
          {Object.entries(groupedTasks).map(([status, tasks]) => {
            const filteredTasks = filterTasks(tasks);
            return (
              <Grid item xs={12} md={4} key={status}>
                <Box className={classes.column}>
                  <Typography variant="h6" className={classes.columnHeader}>
                    {status} ({filteredTasks.length})
                  </Typography>
                  <TaskList
                    tasks={filteredTasks}
                    status={status}
                    onDelete={handleDeleteTask}
                    onStatusUpdate={handleUpdateTaskStatus}
                    handleEditTask={handleEditTask}
                  />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </DragDropContext>
    </Box>
  );
};

export default Dashboard;
