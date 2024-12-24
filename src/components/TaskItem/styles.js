import { createUseStyles } from "react-jss";

const useStyles = createUseStyles(
  (theme) => ({
    taskItemContainer: {
      marginBottom: "1rem",
      border: "1px solid #ddd",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
      transition: "all 0.3s ease-in-out",
      "&:hover": {
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        transform: "scale(1.02)",
      },
      padding: "1rem",
      backgroundColor: "#fff",
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
    description: {
      whiteSpace: "pre-wrap",
      wordWrap: "break-word",
    },
    readMore: {
      color: "blue",
      cursor: "pointer",
    },
    title: {
      whiteSpace: "pre-wrap",
      wordWrap: "break-word",
    },
    readMoreTitle: {
      fontSize: "14px",
      color: "blue",
      fontWeight: "500",
      cursor: "pointer",
    },
    modalContainer: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      maxWidth: "40vw",
      boxShadow: 24,
      padding: "1rem",
      borderRadius: "8px",
      wordWrap: "break-word",
    },
    closeButton: {
      display: "block",
      marginLeft: "auto",
      backgroundColor: "#1C98B0",
      color: "#fff",
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
    "@media (max-width: 1075px)": {
      actionButtonContainer: {
        gridTemplateColumns: "1fr",
        gap: "1rem",
      },
    },
  }),
  {
    name: "TaskItem",
  }
);

export default useStyles;
