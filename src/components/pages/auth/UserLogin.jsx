import { Box, TextField, Button, Alert } from "@mui/material";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [errorSuccess, setErrorSuccess] = useState({
    status: false,
    message: "",
    type: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const actualData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    if (actualData.email && actualData.password) {
      console.log(actualData);

      // use axios to send data to backend

      document.getElementById("login-form").reset();

      // setErrorSuccess({
      //   status: true,
      //   message: "Login Success",
      //   type: "success",
      // });

      navigate("/"); // later navigate to dashboard
    } else {
      setErrorSuccess({
        status: true,
        message: "All fields are required",
        type: "error",
      });
    }
  };

  return (
    <>
      <Box
        component="form"
        id="login-form"
        sx={{ mt: 2 }}
        onSubmit={handleSubmit}
      >
        <TextField
          label="Email Address"
          fullWidth
          margin="normal"
          id="email"
          name="email"
          type="email"
          // required
        />

        <TextField
          label="Password"
          fullWidth
          margin="normal"
          id="password"
          name="password"
          type="password"
          // required
        />

        <Box textAlign="center">
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2, mb: 2, px: 4 }}
          >
            Login
          </Button>
        </Box>

        <NavLink to="/forgot-password-send-email">Forgot Password?</NavLink>

        {errorSuccess.status ? (
          <Alert severity={errorSuccess.type}>{errorSuccess.message}</Alert>
        ) : (
          ""
        )}
      </Box>
    </>
  );
};

export default UserLogin;
