import { Grid, Box, TextField, Alert, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [errorSuccess, setErrorSuccess] = useState({
    status: false,
    message: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const actualData = {
      password: formData.get("password"),
      confirmPassword: formData.get("password-confirmation"),
    };

    if (actualData.password && actualData.confirmPassword) {
      if (actualData.password === actualData.confirmPassword) {
        document.getElementById("reset-password").reset();
        setErrorSuccess({
          status: true,
          message: "Reset Password Successful. Redirecting to Login Page...",
          type: "success",
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setErrorSuccess({
          status: true,
          message: "Password not matching!",
          type: "error",
        });
      }
    } else {
      setErrorSuccess({
        status: true,
        message: "All fields are required!",
        type: "error",
      });
    }
  };
  return (
    <>
      <Grid container justifyContent="center">
        <Grid>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            id="reset-password"
            onSubmit={handleSubmit}
          >
            <TextField
              type="password"
              name="password"
              id="password"
              label="New Password"
              fullWidth
              margin="normal"
              required
            />

            <TextField
              type="password"
              name="password-confirmation"
              id="password-confirmation"
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
            ) : (
              ""
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ResetPassword;
