import { createUseStyles } from "react-jss";

const useStyles = createUseStyles(
  {
    taskList: {
      minHeight: "100px",
      overflowY: "auto",
      padding: "4px",
      "& > *": {
        marginBottom: "8px",
      },
      "&::-webkit-scrollbar": {
        width: "8px",
      },
      "&::-webkit-scrollbar-track": {
        background: "#f1f1f1",
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#888",
        borderRadius: "4px",
        "&:hover": {
          background: "#555",
        },
      },
    },
  },
  { name: "TaskList" }
);

export default useStyles;
