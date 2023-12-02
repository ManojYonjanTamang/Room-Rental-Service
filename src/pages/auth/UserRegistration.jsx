import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../services/userAuthApi";

const UserRegistration = () => {
  const [serverError, setServerError] = useState();

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
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

    const res = await registerUser(actualData);
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
            <Checkbox value={true} name="termCondition" id="termCondition" />
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
      </Box>
    </>
  );
};

export default UserRegistration;
