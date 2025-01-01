import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUser, registerUser } from "@/api/api";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { IApiError } from "@/types";
import * as yup from "yup";
import styles from "./styles";

interface IAuthFormProps {
  isLogin: boolean;
  toggleForm: () => void;
}

interface IFormData {
  username: string;
  password: string;
  role?: "Admin" | "Manager" | "User";
}

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters"),
});

const AuthForm = ({ isLogin, toggleForm }: IAuthFormProps) => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<IApiError | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { login } = useContext(AuthContext);
  const classes = styles();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });

  const handleAuthSubmit = async (formData: IFormData) => {
    setApiError(null);
    try {
      //Send request to login or register [S.P]
      const response = isLogin
        ? await loginUser(formData)
        : await registerUser(formData);

      //Save token and user to local storage and state in AuthContext [S.P]
      login(response.token, response.user);
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Authentication failed", error);
      setApiError(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleAuthSubmit)}
      className={classes.authFormContainer}
    >
      <Typography variant="h4" gutterBottom>
        {isLogin ? "Login" : "Register"}
      </Typography>

      {apiError && (
        <Typography color="error">
          {typeof apiError === "object" ? apiError.message : apiError}
        </Typography>
      )}

      <TextField
        {...register("username")}
        label="Username"
        fullWidth
        margin="normal"
        error={!!errors.username}
        helperText={errors.username?.message}
        sx={{ marginBottom: 2 }}
      />

      <TextField
        {...register("password")}
        label="Password"
        type={showPassword ? "text" : "password"}
        fullWidth
        margin="normal"
        error={!!errors.password}
        helperText={errors.password?.message}
        sx={{ marginBottom: 3 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={togglePasswordVisibility} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {!isLogin && (
        <FormControl fullWidth margin="normal" sx={{ marginBottom: 3 }}>
          <InputLabel>Role</InputLabel>
          <Select {...register("role")} label="Role" defaultValue="">
            {["Admin", "Manager", "User"].map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
          {errors.role && (
            <Typography color="error">{errors.role.message}</Typography>
          )}
        </FormControl>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        className={classes.authFormButton}
      >
        {isLogin ? "Login" : "Register"}
      </Button>
      {isLogin ? (
        <Box sx={{ marginTop: "1rem" }}>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link
              style={{ color: "#1c98b0" }}
              to="/register"
              onClick={toggleForm}
            >
              Register
            </Link>
          </Typography>
        </Box>
      ) : (
        <Box sx={{ marginTop: "1rem" }}>
          <Typography variant="body2">
            Already have an account?{" "}
            <Link style={{ color: "#1c98b0" }} to="/login" onClick={toggleForm}>
              Login
            </Link>
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default AuthForm;
