import { Box } from "@mui/material";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./styles";
import TaskItem from "../TaskItem/TaskItem";
import { ITask } from "@/types";

interface ITaskListProps {
  tasks: ITask[];
  status: string;
  onStatusUpdate: (taskId: string, status: string) => void;
  handleEditTask: (taskId: string) => void;
  handleDeleteTask: (taskId: string, userRole: string) => void;
}

const TaskList = ({
  tasks,
  status,
  onStatusUpdate,
  handleEditTask,
  handleDeleteTask,
}: ITaskListProps) => {
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
