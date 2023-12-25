import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { getToken } from "../services/LocalStorageService";
import PostForm from "../pages/postform";

function Navbar() {
  const { accessToken } = getToken();
  // console.log(accessToken);

  const [isPostFormOpen, setIsPostFormOpen] = useState(false);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              e-Room
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




            {accessToken && (
              <Button
                onClick={() => setIsPostFormOpen(true)}
                sx={{ color: "white", textTransform: "none", backgroundColor: "#1F4172" }}
              >
                Add Post
              </Button>
            )}

            {accessToken ? (
              <Button
                component={NavLink}
                to="/dashboard"
                sx={{ color: "white", textTransform: "none" }}
                style={({ isActive }) => {
                  return { backgroundColor: isActive && "#1F4172" };
                }}
              >
                Dashboard
              </Button>
            ) : (
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
            )}
          </Toolbar>
        </AppBar>
      </Box>
      {isPostFormOpen && <PostForm onClose={() => setIsPostFormOpen(false)} />}
    </>
  );
}

export default Navbar;
