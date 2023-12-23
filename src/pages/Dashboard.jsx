import {
  Alert,
  Box,
  Button,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../services/LocalStorageService";
import { useDispatch, useSelector } from "react-redux";
import { unSetUserToken } from "../features/authSlice";
import {
  useChangeUserPasswordMutation,
  useGetLoggedUserQuery,
} from "../services/userAuthApi";
import { setUserInfo, unSetUserInfo } from "../features/userSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { accessToken } = getToken();
  const { data, isSuccess } = useGetLoggedUserQuery(accessToken);

  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setUserInfo({ email: data.email, name: data.name }));
    }
  }, [data, isSuccess, dispatch]);

  const userData = useSelector((state) => state.user);

  const [changeUserPassword] = useChangeUserPasswordMutation();
  const [serverError, setServerError] = useState({});
  const [serverMsg, setServerMsg] = useState({});

  const handleLogout = () => {
    dispatch(unSetUserInfo({ email: "", name: "" }));
    dispatch(unSetUserToken({ accessToken: null }));
    removeToken();
    navigate("/login");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const actualData = {
      password: formData.get("password"),
      password2: formData.get("password2"),
    };

    const res = await changeUserPassword({ actualData, accessToken });
    console.log(res);

    if (res.error) {
      setServerMsg({});
      setServerError(res.error.data.errors);
    }
    if (res.data) {
      setServerError({});
      setServerMsg(res.data);
      document.getElementById("changePasswordForm").reset();
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
          <Typography variant="h5">Email: {userData.email}</Typography>
          <Typography variant="h6">Name: {userData.name}</Typography>
          <Button
            variant="contained"
            color="warning"
            size="medium"
            sx={{ mt: 8 }}
            onClick={handleLogout}
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
              id="password2"
              name="password2"
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

export default Dashboard;
