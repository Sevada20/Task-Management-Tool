import { Box } from "@mui/material";
import TaskItem from "../TaskItem/TaskItem";
import styles from "./styles";

const TaskList = ({
  tasks,
  handleDeleteTask,
  handleUpdateTaskStatus,
  handleEditTask,
}) => {
  const classes = styles();

  return (
    <Box className={classes.taskListContainer}>
      {tasks.map((task) => (
        <TaskItem
          handleEditTask={handleEditTask}
          handleUpdateTaskStatus={handleUpdateTaskStatus}
          handleDeleteTask={handleDeleteTask}
          key={task._id}
          task={task}
        />
      ))}
    </Box>
  );
};

export default TaskList;
