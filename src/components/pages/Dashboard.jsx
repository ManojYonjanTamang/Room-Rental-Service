import {
  Alert,
  Box,
  Button,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [errorSuccess, setErrorSuccess] = useState({
    status: false,
    message: "",
    type: "",
  });

  const handleClick = () => {
    navigate("/login");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const actualData = {
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    if (actualData.password && actualData.confirmPassword) {
      if (actualData.password === actualData.confirmPassword) {
        document.getElementById("changePasswordForm").reset();
        setErrorSuccess({
          status: true,
          message: "Password change successfull",
          type: "success",
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setErrorSuccess({
          status: true,
          message: "Password and confirm password should match",
          type: "error",
        });
      }
    } else {
      setErrorSuccess({
        status: true,
        message: "All fields should be filled",
        type: "error",
      });
    }
  };

  return (
    <>
      <CssBaseline />
      <Grid container height="100vh">
        <Grid
          item
          sm={6}
          sx={{ backgroundColor: "gray", p: 5, color: "white" }}
        >
          <h1>User Detail</h1>
          <Typography variant="h5">Email: {"example@gmail.com"}</Typography>
          <Typography variant="h6">Name: {"John Doe"}</Typography>
          <Button
            variant="contained"
            color="warning"
            size="medium"
            sx={{ mt: 8 }}
            onClick={handleClick}
          >
            Logout
          </Button>
        </Grid>

        <Grid item sm={6}>
          <Box
            component="form"
            id="changePasswordForm"
            onSubmit={handleFormSubmit}
            noValidate
            sx={{ m: 4 }}
          >
            <h1>Change Password</h1>
            <TextField
              type="password"
              id="password"
              name="password"
              label="New Password"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm New Password"
              fullWidth
              margin="normal"
              required
            />
            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, px: 5, mb: 2 }}
              >
                Save
              </Button>
            </Box>
            {errorSuccess.status ? (
              <Alert severity={errorSuccess.type}>{errorSuccess.message}</Alert>
            ) : null}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
