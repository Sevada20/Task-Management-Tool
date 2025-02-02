import { createUseStyles } from "react-jss";
const useStyles = createUseStyles(
  () => ({
    dashboardCard: {
      boxShadow: 3,
      borderRadius: "16px",
      backgroundColor: "#fff",
      padding: "1rem",
    },
    createTaskButton: {
      backgroundColor: "#1c98b0",
      "&:hover": {
        backgroundColor: "#137a91",
      },
    },
  }),
  { name: "DashboardPage" }
);

export default useStyles;
