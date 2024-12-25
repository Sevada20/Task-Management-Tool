import { createUseStyles } from "react-jss";

const styles = createUseStyles(
  (theme) => ({
    authFormContainer: {
      textAlign: "center",
      width: "100%",
      margin: "0 auto",
      padding: 4,
      boxShadow: 4,
      borderRadius: 3,
      backgroundColor: "#fff",
    },
    authFormButton: {
      padding: "12px",
      fontWeight: "bold",
      backgroundColor: "#1c98b0",
      "&:hover": {
        backgroundColor: "#1c98b0",
      },
    },
  }),
  { name: "auth-form" }
);

export default styles;
