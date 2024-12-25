import { createUseStyles } from "react-jss";

const useStyles = createUseStyles(
  {
    dashboard: {
      padding: "20px",
      overflowY: "hidden",
    },
    filters: {
      display: "flex",
      gap: "16px",
      marginBottom: "20px",
      alignItems: "center",
    },
    searchField: {
      width: "300px",
    },
    filterSelect: {
      minWidth: "150px",
    },
    column: {
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      padding: "16px",
      height: "calc(100vh - 180px)",
      display: "flex",
      flexDirection: "column",
    },
    columnHeader: {
      marginBottom: "16px",
      padding: "8px",
      borderRadius: "4px",
      backgroundColor: "#1c98b0",
      color: "white",
      textAlign: "center",
      flexShrink: 0,
    },
    taskList: {
      overflowY: "auto",
      flex: 1,
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
  { name: "Dashboard" }
);

export default useStyles;
