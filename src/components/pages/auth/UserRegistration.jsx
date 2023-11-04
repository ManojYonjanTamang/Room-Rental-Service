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
      contactNumber: formData.get("contactNumber"),
      password: formData.get("password"),
      confirmPassword: formData.get("password-confirmation"),
      termCondition: formData.get("termCondition"),
    };

    if (
      actualData.name &&
      actualData.email &&
      actualData.contactNumber &&
      actualData.password &&
      actualData.termCondition
    ) {
      if (actualData.password === actualData.confirmPassword) {
        document.getElementById("registration_form").reset();
        setErrorSuccess({
          status: true,
          message: "Registration Success",
          type: "success",
        });
        navigate("/dashboard");
      } else {
        setErrorSuccess({
          status: true,
          message: "Password and Confirm Password should match!",
          type: "error",
        });
      }
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
        <TextField
          label="Email address"
          fullWidth
          margin="normal"
          type="email"
          name="email"
          id="email"
          required
        />
        <TextField
          label="Phone Number"
          fullWidth
          margin="normal"
          type="text"
          name="contactNumber"
          id="contactNumber"
          required
        />
        <TextField
          type="password"
          name="password"
          id="password"
          label="Password"
          margin="normal"
          sx={{ mr: 5 }}
          required
        />

        <TextField
          type="password"
          name="password-confirmation"
          id="password-confirmation"
          label="Confirm Password"
          margin="normal"
          required
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
