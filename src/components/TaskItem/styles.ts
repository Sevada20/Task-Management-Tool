import { createUseStyles } from "react-jss";

const useStyles = createUseStyles(
  {
    taskCard: {
      marginBottom: "8px",
      cursor: "grab",
      "&:active": {
        cursor: "grabbing",
      },
      "&:hover": {
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      },
    },
    title: {
      fontSize: "1.1rem",
      fontWeight: "500",
      marginBottom: "8px",
      wordBreak: "break-word",
    },
    description: {
      marginBottom: "0.5rem",
      color: "rgba(0, 0, 0, 0.7)",
    },
    actionButtonContainer: {
      borderTop: "1px solid #ddd",
      backgroundColor: "#f9f9f9",
      borderBottomLeftRadius: "8px",
      borderBottomRightRadius: "8px",
      display: "grid",
      gap: "0.5rem",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      justifyItems: "stretch",
    },
    editButton: {
      backgroundColor: "#1c98b0",
      "&:hover": {
        backgroundColor: "#137a91",
      },
    },
    deleteButton: {
      border: "1px solid #f44336",
      textTransform: "uppercase",
      color: "#f44336",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "#f44336",
        color: "#ffffff",
        borderColor: "#d32f2f",
      },
    },

    "@media (max-width: 600px)": {
      actionButtonContainer: {
        gridTemplateColumns: "1fr",
        gap: "1rem",
      },
      deleteButton: {
        width: "100%",
      },
    },
  },
  { name: "task-item" }
);

export default useStyles;
