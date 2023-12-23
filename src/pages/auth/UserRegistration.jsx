import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../services/userAuthApi";
import { storeToken } from "../../services/LocalStorageService";

const UserRegistration = () => {
  const [serverError, setServerError] = useState({});

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const actualData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password"),
      password2: formData.get("password2"),
      termCondition: formData.get("termCondition"),
    };

    const res = await registerUser(actualData);

    if (res.error) {
      // console.log(res.error.data);
      setServerError(res.error.data);
    }
    if (res.data) {
      storeToken(res.data.token);
      navigate("/dashboard");
    }
  };

  return (
    <>
      {/* {serverError.email ? console.log(serverError.email[0]) : ""}
      {serverError.password ? console.log(serverError.password[0]) : ""}
      {serverError.password2 ? console.log(serverError.password2[0]) : ""}
      {serverError.termCondition
        ? console.log(serverError.termCondition[0])
        : ""} */}

      <Box
        component="form"
        id="registration_form"
        sx={{ mt: 2 }}
        onSubmit={handleSubmit}
        noValidate
      >
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          type="name"
          name="name"
          id="name"
          required
        />
        {serverError.name ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {serverError.name[0]}
          </Typography>
        ) : (
          ""
        )}
        <TextField
          label="Email address"
          fullWidth
          margin="normal"
          type="email"
          name="email"
          id="email"
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
          label="Phone Number"
          fullWidth
          margin="normal"
          type="text"
          name="phone"
          id="phone"
          required
        />{" "}
        {serverError.phone ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {serverError.phone[0]}
          </Typography>
        ) : (
          ""
        )}
        <TextField
          type="password"
          name="password"
          id="password"
          label="Password"
          margin="normal"
          sx={{ mr: 5 }}
          required
        />
        {serverError.password ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {serverError.password[0]}
          </Typography>
        ) : (
          ""
        )}
        <TextField
          type="password"
          name="password2"
          id="password2"
          label="Confirm Password"
          margin="normal"
          required
        />
        {serverError.password2 ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {serverError.password2[0]}
          </Typography>
        ) : (
          ""
        )}
        <FormControlLabel
          label="I agree to term and condition."
          control={
            <Checkbox value={true} name="termCondition" id="termCondition" />
          }
        />
        {serverError.termCondition ? (
          <span style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {serverError.termCondition[0]}
          </span>
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
              Register
            </Button>
          )}
        </Box>
        {/* non_field_errors */}
        {serverError.non_field_errors ? (
          <Alert severity="error">{serverError.non_field_errors[0]}</Alert>
        ) : (
          ""
        )}
      </Box>
    </>
  );
};

export default UserRegistration;
