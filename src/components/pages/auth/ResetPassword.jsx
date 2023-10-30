import { Alert, Box, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

const ResetPassword = () => {
  const [errorSuccess, setErrorSuccess] = useState({
    status: false,
    message: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const actualData = {
      email: formData.get("email"),
    };

    if (actualData.email) {
      document.getElementById("password-reset-form").reset();
      setErrorSuccess({
        status: true,
        message: "Please check your email to reset password",
        type: "success",
      });
    } else {
      setErrorSuccess({
        status: true,
        message: "Please provide valid email",
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
            id="password-reset-form"
            onSubmit={handleSubmit}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Enter your email address"
            />

            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, px: 5, mb: 2 }}
              >
                Send
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
