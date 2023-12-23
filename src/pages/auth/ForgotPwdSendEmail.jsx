import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForgotPwdSendEmailMutation } from "../../services/userAuthApi";

const ForgotPwdSendEmail = () => {
  const [forgotPwdSendEmail, { isLoading }] = useForgotPwdSendEmailMutation();
  const [serverError, setServerError] = useState({});
  const [serverMsg, setServerMsg] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const actualData = {
      email: formData.get("email"),
    };

    const res = await forgotPwdSendEmail(actualData);

    if (res.error) {
      setServerMsg({});
      setServerError(res.error.data.errors);
    }

    if (res.data) {
      setServerError({});
      setServerMsg(res.data);
      document.getElementById("forgot-password-send-email").reset();
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
            id="forgot-password-send-email"
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

            {serverError.email ? (
              <Typography
                style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
              >
                {serverError.email[0]}
              </Typography>
            ) : (
              ""
            )}

            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, px: 5, mb: 2 }}
              >
                Send
              </Button>
            </Box>

            {serverError.non_field_errors ? (
              <Alert severity="error">{serverError.non_field_errors[0]}</Alert>
            ) : (
              ""
            )}

            {serverMsg.message ? (
              <Alert severity="success">{serverMsg.message}</Alert>
            ) : (
              ""
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ForgotPwdSendEmail;
