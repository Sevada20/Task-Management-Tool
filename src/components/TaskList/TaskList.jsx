import { Box } from "@mui/material";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskItem from "../TaskItem/TaskItem";
import styles from "./styles";

const TaskList = ({
  tasks,
  status,
  onStatusUpdate,
  handleEditTask,
  handleDeleteTask,
}) => {
  const classes = styles();

  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={classes.taskList}
        >
          {tasks.map((task, index) => (
            <Draggable key={task._id} draggableId={task._id} index={index}>
              {(provided, snapshot) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  sx={{
                    opacity: snapshot.isDragging ? 0.8 : 1,
                  }}
                >
                  <TaskItem
                    handleDeleteTask={handleDeleteTask}
                    task={task}
                    onStatusUpdate={onStatusUpdate}
                    handleEditTask={handleEditTask}
                  />
                </Box>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};

export default TaskList;
