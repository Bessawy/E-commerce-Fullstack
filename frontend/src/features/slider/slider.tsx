import { Box } from "@mui/material";
import React, { useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import IconButton from "@mui/material/IconButton";
import CircleIcon from "@mui/icons-material/Circle";
import "./slider.scss";

interface SliderPropsType {
  slides: string[];
}

const ImageSlider = (props: SliderPropsType) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const IconStyle = {
    fontSize: 40,
    color: "#FF5F1F",
    margin: 2,
  };

  const slideStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    backgroundPosition: "center",
    backgroundImage: `url(${props.slides[currentIndex]})`,
  };

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Box
        className="Slider"
        style={slideStyle}
        border={1}
        sx={{ boxShadow: 3 }}
      >
        <IconButton
          className="Slider__leftArrow"
          onClick={() => setCurrentIndex(currentIndex - 1)}
          disabled={currentIndex === 0}
        >
          <NavigateBeforeIcon sx={IconStyle} />
        </IconButton>
        <IconButton
          className="Slider__rightArrow"
          onClick={() => setCurrentIndex(currentIndex + 1)}
          disabled={currentIndex + 1 === props.slides.length}
        >
          <NavigateNextIcon sx={IconStyle} />
        </IconButton>
      </Box>
      <Box sx={{ justifyContent: "center", display: "flex" }}>
        {props.slides.map((item, index) => {
          return (
            <IconButton key={index} onClick={() => setCurrentIndex(index)}>
              <CircleIcon sx={{ fontSize: 10 }} />{" "}
            </IconButton>
          );
        })}
      </Box>
    </Box>
  );
};

export default ImageSlider;
