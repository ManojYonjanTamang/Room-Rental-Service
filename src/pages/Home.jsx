import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useGetRoomPostsQuery } from "../services/roomItems";
import CardImage from "./CardImage";

const Home = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetRoomPostsQuery();

  // console.log(data);

  const handleLearnMoreClick = () => {
    console.log("object clicked");
    
  };

  return (
    <>
      <h1>Home Page</h1>
      <hr />
      <Grid container spacing={2}>
        {isSuccess &&
          data.posts.map((res) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardImage images={res?.images} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {res.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {res.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    to="/contact"
                    onClick={() => handleLearnMoreClick(res.id)}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default Home;
