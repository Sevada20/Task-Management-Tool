import { createUseStyles } from "react-jss";

const useStyles = createUseStyles(
  (theme) => ({
    dashboardHeader: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 2,
    },
  }),
  { name: "Dashboard" }
);

export default useStyles;
