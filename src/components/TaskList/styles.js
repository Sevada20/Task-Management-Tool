import { createUseStyles } from "react-jss";

const useStyles = createUseStyles(
  {
    taskListContainer: {
      maxHeight: "447px",
      overflowY: "auto",
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "1rem",
    },
  },
  { name: "TaskList" }
);

export default useStyles;
