import { createUseStyles } from "react-jss";

const useStyles = createUseStyles(
  {
    appBar: {
      backgroundColor: "#1c98b0",
    },
    appBarTitle: {
      fontWeight: "bold",
      marginRight: 2,
      fontSize: { xs: "1.1rem", sm: "1.25rem" },
      whiteSpace: { xs: "normal", sm: "nowrap" },
      lineHeight: { xs: "1.2", sm: "normal" },
      color: "inherit",
      "&:hover": {
        textDecoration: "none",
      },
      "@media (max-width: 600px)": {
        whiteSpace: "normal",
        fontSize: "1.1rem",
        lineHeight: "1.2",
      },
      "@media (min-width: 601px)": {
        whiteSpace: "nowrap",
      },
    },
    logoutButton: {
      marginLeft: "1rem",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      },
    },
    menuButton: {
      marginRight: "1rem",
    },
  },
  { name: "MainLayout" }
);

export default useStyles;
