import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import AuthForm from "@/components/AuthForm/AuthForm";
import styles from "./styles";

const LoginPage = () => {
  const classes = styles();
  const params = useParams();
  const [isLogin, setIsLogin] = useState(params.auth === "login");

  //Toggle between login and register forms [S.P]
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Box className={classes.authContainer}>
      <AuthForm toggleForm={toggleForm} isLogin={isLogin} />
    </Box>
  );
};

export default LoginPage;
