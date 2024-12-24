import { createUseStyles } from "react-jss";
const useStyles = createUseStyles(
  (theme) => ({
    dashboardCard: {
      boxShadow: 3,
      borderRadius: "16px",
      backgroundColor: "#fff",
      padding: "1rem",
    },
  }),
  { name: "DashboardPage" }
);

export default useStyles;
