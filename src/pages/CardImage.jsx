import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function CardImage(props) {
  console.log(props.images);
  return (
    <Carousel
      showArrows={true}
      showThumbs={true}
      sx={{ height: 25, objectFit: "cover" }}
    >
      {props?.images?.map((image) => {
        return (
          <div>
            <img src={`http://127.0.0.1:8000/${image?.image}`} />
          </div>
        );
      })}
    </Carousel>
  );
}

export default CardImage;
