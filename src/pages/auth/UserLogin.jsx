import {
  Box,
  TextField,
  Button,
  Alert,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../services/userAuthApi";

const UserLogin = () => {
  const [serverError, setServerError] = useState({});
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [errorSuccess, setErrorSuccess] = useState({
    status: false,
    message: "",
    type: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const actualData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    // backend validation
    const res = await loginUser(actualData);

    console.log(res);
    if (res.error) {
      setServerError(res.error.data.errors);
    }
    if (res.data) {
      console.log(res.data);
      navigate("/dashboard");
    }

    // frontend validation
    // if (actualData.email && actualData.password) {
    //   loginUser(actualData);
    // document.getElementById("login-form").reset();
    //   navigate("/dashboard");
    // } else {
    //   setErrorSuccess({
    //     status: true,
    //     message: "All fields are required",
    //     type: "error",
    //   });
    // }
  };

  return (
    <>
      <Box
        component="form"
        id="login-form"
        sx={{ mt: 2 }}
        onSubmit={handleSubmit}
        noValidate
      >
        <TextField
          label="Email Address"
          fullWidth
          margin="normal"
          id="email"
          name="email"
          type="email"
          required
        />
        {serverError.email ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {serverError.email[0]}
          </Typography>
        ) : (
          ""
        )}

        <TextField
          label="Password"
          fullWidth
          margin="normal"
          id="password"
          name="password"
          type="password"
          required
        />
        {serverError.password ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {serverError.password[0]}
          </Typography>
        ) : (
          ""
        )}

        <Box textAlign="center">
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2, mb: 2, px: 4 }}
            >
              Login
            </Button>
          )}
        </Box>

        <NavLink to="/forgot-password-send-email">Forgot Password?</NavLink>

        {/* Fontend validation */}
        {/* {errorSuccess.status ? (
          <Alert severity={errorSuccess.type}>{errorSuccess.message}</Alert>
        ) : (
          ""
        )} */}

        {serverError.non_field_errors ? (
          <Alert severity="error">{serverError.non_field_errors[0]}</Alert>
        ) : (
          ""
        )}
      </Box>
    </>
  );
};

export default UserLogin;
