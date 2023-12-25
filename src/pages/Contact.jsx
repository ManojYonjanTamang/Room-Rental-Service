import { Grid } from "@mui/material";
import React from "react";
import PostForm from "./AddForm";

const Contact = () => {
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item sm={10}>
          <h1>Contact</h1>
          <hr />

          <PostForm />
        </Grid>
      </Grid>
    </>
  );
};

export default Contact;
