import { createUseStyles } from "react-jss";

const useStyles = createUseStyles(
  () => ({
    authContainer: {
      height: "100vh",
      maxWidth: "30vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "0 auto",
    },
  }),
  { name: "LoginPage" }
);

export default useStyles;
