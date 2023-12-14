import { Grid, Box, TextField, Alert, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useResetPasswordMutation } from "../../services/userAuthApi";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [resetPassword] = useResetPasswordMutation();
  const [serverError, setServerError] = useState({});
  const [serverMsg, setServerMsg] = useState({});
  const { id, token } = useParams();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const actualData = {
      password: formData.get("password"),
      password2: formData.get("password2"),
    };

    console.log(actualData);
    const res = await resetPassword({ actualData, id, token });
    console.log(res);

    if (res.error) {
      setServerMsg({});
      setServerError(res.error.data.errors);
    }

    if (res.data) {
      setServerError({});
      setServerMsg(res.data);
      document.getElementById("reset-password").reset();

      setTimeout(() => {
        navigate("/login");
      }, 3000);
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
            {serverError.password ? (
              <Typography
                style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
              >
                {serverError.password[0]}
              </Typography>
            ) : (
              ""
            )}

            <TextField
              type="password"
              name="password2"
              id="password2"
              label="Confirm New Password"
              fullWidth
              margin="normal"
              required
            />

            {serverError.password2 ? (
              <Typography
                style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
              >
                {serverError.password2[0]}
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
                Save
              </Button>
            </Box>
          </Box>

          {serverMsg.non_field_errirs ? (
            <Alert severity="error">{serverMsg.non_field_errirs}</Alert>
          ) : (
            ""
          )}

          {serverMsg.message ? (
            <Alert severity="success">{serverMsg.message}</Alert>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ResetPassword;
