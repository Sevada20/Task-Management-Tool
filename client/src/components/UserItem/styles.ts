import { createUseStyles } from "react-jss";

const useStyles = createUseStyles(
  () => ({
    userItem: {
      marginBottom: "1rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  }),
  { name: "UserItem" }
);

export default useStyles;
