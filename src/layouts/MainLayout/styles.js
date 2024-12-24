import { createUseStyles } from "react-jss";

const useStyles = createUseStyles(
  (theme) => ({
    appBar: {
      backgroundColor: "#1C98B0",
      boxShadow: 3,
      borderBottom: "1px solid #E0E0E0",
      transition: "background-color 0.3s ease",
    },
    logoutButton: {
      fontWeight: "bold",
      fontSize: "1rem",
      letterSpacing: "1px",
      borderRadius: "20px",
      padding: "6px 12px",
      textTransform: "none",
      transition: "background-color 0.3s ease",
      "&:hover": {
        backgroundColor: "#0C8A99",
      },
    },
    appBarTitle: {
      fontWeight: "bold",
      fontSize: "1.25rem",
      color: "#fff",
      letterSpacing: "1px",
      textTransform: "uppercase",
    },
  }),
  { name: "MainLayout" }
);

export default useStyles;
