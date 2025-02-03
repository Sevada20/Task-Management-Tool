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
import { ITask, IUser } from "@/types";
import TaskList from "../TaskList/TaskList";
import styles from "./styles";

interface IDashboardProps {
  groupedTasks: Record<string, ITask[]>;
  handleUpdateTaskStatus: (taskId: string, newStatus: string) => void;
  handleEditTask: (taskId: string) => void;
  handleDeleteTask: (taskId: string, userRole: string) => void;
  user: IUser | null;
}

const Dashboard = ({
  groupedTasks,
  handleUpdateTaskStatus,
  handleEditTask,
  handleDeleteTask,
}: IDashboardProps) => {
  const classes = styles();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const { user } = useContext(AuthContext);

  const canUseFilters = user?.role === "Admin" || user?.role === "Manager";

  //Drag and drop functionality [S.P]
  const onDragEnd = (result: any) => {
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

  const filterTasks = (tasks: ITask[]) => {
    return tasks.filter((task: ITask) => {
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
                <Box
                  sx={{
                    borderTop: `3px solid ${
                      status === "To Do"
                        ? "#9c27b0"
                        : status === "In Progress"
                        ? "#1976d2"
                        : "#2e7d32"
                    }`,
                  }}
                  className={classes.column}
                >
                  <Typography variant="h6" className={classes.columnHeader}>
                    {status} ({filteredTasks.length})
                  </Typography>
                  <TaskList
                    handleDeleteTask={handleDeleteTask}
                    tasks={filteredTasks}
                    status={status}
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
