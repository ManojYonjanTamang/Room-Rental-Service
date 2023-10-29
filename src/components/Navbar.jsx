import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              Bhadama
            </Typography>
            <Button
              component={NavLink}
              to="/"
              sx={{ color: "white", textTransform: "none" }}
              style={({ isActive }) => {
                return { backgroundColor: isActive && "#1F4172" };
              }}
            >
              Home
            </Button>

            <Button
              component={NavLink}
              to="/contact"
              sx={{ color: "white", textTransform: "none" }}
              style={({ isActive }) => {
                return { backgroundColor: isActive && "#1F4172" };
              }}
            >
              Contact
            </Button>

            <Button
              component={NavLink}
              to="/login"
              sx={{ color: "white", textTransform: "none" }}
              style={({ isActive }) => {
                return { backgroundColor: isActive && "#1F4172" };
              }}
            >
              Login/Registration
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Navbar;
