import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserRegistration = () => {
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
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      password_confirmation: formData.get("password-confirmation"),
      termCondition: formData.get("termCondition"),
    };

    if (
      actualData.name &&
      actualData.email &&
      actualData.password &&
      actualData.termCondition
    ) {
      if (actualData.password === actualData.password_confirmation) {
        console.log(actualData);
        document.getElementById("registration_form").reset();
        setErrorSuccess({
          status: true,
          message: "Registration Success",
          type: "success",

          // navigate("/contact");
        });
      } else {
        setErrorSuccess({
          status: true,
          message: "Password and Confirm Password should match!",
          type: "error",
        });
      }
    } else {
      console.log("error");
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
        id="registration_form"
        mt={2}
        onSubmit={handleSubmit}
      >
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          type="name"
          name="name"
          id="name"
        />

        <TextField
          label="Email address"
          fullWidth
          margin="normal"
          type="email"
          name="email"
          id="email"
        />

        <TextField
          type="password"
          name="password"
          id="password"
          label="Password"
          fullWidth
          margin="normal"
        />

        <TextField
          type="password"
          name="password-confirmation"
          id="password-confirmation"
          label="Confirm Password"
          fullWidth
          margin="normal"
        />

        <FormControlLabel
          label="I agree to term and condition."
          control={
            <Checkbox value="checked" name="termCondition" id="termCondition" />
          }
        />

        <Box textAlign="center">
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2, mb: 2, px: 4 }}
          >
            Register
          </Button>
        </Box>

        {errorSuccess.status ? (
          <Alert severity={errorSuccess.type}>{errorSuccess.message}</Alert>
        ) : (
          ""
        )}
      </Box>
    </>
  );
};

export default UserRegistration;
