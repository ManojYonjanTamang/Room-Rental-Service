import React, { useState } from "react";
import { Card, Grid, Box, Tabs, Tab } from "@mui/material";
import LoginImg from "../../images/LoginImg.png";
import UserLogin from "./UserLogin";
import UserRegistration from "./UserRegistration";

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const LoginReg = () => {
  const [value, setValue] = useState(0);

  function handleChange(e, index) {
    setValue(index);
  }

  return (
    <div>
      <Grid container sx={{ height: "90vh" }}>
        <Grid
          item
          lg={7}
          sm={5}
          sx={{
            backgroundImage: `url(${LoginImg})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            display: { xs: "none", sm: "block" },
          }}
        ></Grid>

        <Grid item lg={5} sm={7} xs={12}>
          <Card sx={{ width: "100%", height: "100%" }}>
            <Box sx={{ mx: 2 }}>
              <Box sx={{ borderBottom: 1, borderColor: "gray" }}>
                <Tabs value={value} onChange={handleChange}>
                  <Tab
                    label="Login"
                    sx={{ textTransform: "none", fontWeight: "bold" }}
                  />
                  <Tab
                    label="Register"
                    sx={{ textTransform: "none", fontWeight: "bold" }}
                  />
                </Tabs>
              </Box>

              <TabPanel value={value} index={0}>
                <UserLogin />
              </TabPanel>

              <TabPanel value={value} index={1}>
                <UserRegistration />
              </TabPanel>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginReg;
