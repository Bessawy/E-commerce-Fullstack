import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import WeekendIcon from "@mui/icons-material/Weekend";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import IceSkatingOutlinedIcon from "@mui/icons-material/IceSkatingOutlined";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import Typewriter from "react-ts-typewriter";
import TextField from "@mui/material/TextField";
import "swiper/css/scrollbar";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay"

import { useAppSelector } from "../reduxhook/hooks";
import { ProductType } from "../Types/product";
import ProductItem from "./product/Product";
import { FlexBox } from "../Styles/Themes/styledComp";

const images = [
  "/clothes.jpg",
  "/furniture.jpg",
  "shoes.jpg",
  "electronics.jpg",
];

const advertise = ["laptop.jpg", "razor.jpg"];

const Home = () => {
  const products = useAppSelector((state) => state.productReducer);
  const [productList, setProductList] = useState<ProductType[]>([]);
  const { pathname } = useLocation();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setProductList(products.slice(0, 10));
  }, [products]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const navigate = useNavigate();

  return (
    <Box>
      <Swiper className="mySwiper" 
      modules={[Pagination, Autoplay]}
      slidesPerView={1}
      autoplay={{delay: 5000}}
      >

        {advertise.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <Box
                component="img"
                src={item}
                sx={{ width: "100%", height: isMatch ? 250 : 450 }}
              ></Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Divider sx={{ margin: 2 }} />
      <Grid container spacing={2} mt={2}>
        <Grid item md={1} xs={0}></Grid>
        <Grid item xs={12} md={4}>
          <FlexBox sx={{flexDirection: "column", p: 3}}>
            <Typography variant="h5" color="#FF5F1F">
              Product Categories
            </Typography>
            <Divider />
            <List>
              <ListItem>
                <IceSkatingOutlinedIcon sx={{ marginRight: 2 }} /> Shoes
              </ListItem>
              <ListItem>
                <LaptopChromebookIcon sx={{ marginRight: 2 }} /> Electronics
              </ListItem>
              <ListItem>
                <WeekendIcon sx={{ marginRight: 2 }} /> Furniture
              </ListItem>
              <ListItem>
                <CheckroomIcon sx={{ marginRight: 2 }} />
                Clothes
              </ListItem>
              <ListItem>
                <AddOutlinedIcon sx={{ marginRight: 2 }} /> Others
              </ListItem>
            </List>
            <Divider />
            <Typography variant="h6" marginTop={2} textAlign={"center"}>
              More Product are added on a daily basis
            </Typography>
          </FlexBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <FlexBox
            sx={{ width: "80%", m: "auto" }}
            height={isMatch ? "40vh" : "50vh"}
          >
            <Swiper
              pagination={{
                type: "progressbar",
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              autoplay={{delay: 1000}}
              className="mySwiper"
            >
              {images.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Box
                      component="img"
                      src={item}
                      sx={{
                        width: "100%",
                        boxShadow: 3,
                        borderRadius: 10,
                      }}
                      height={isMatch ? "40vh" : "50vh"}
                    ></Box>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </FlexBox>
        </Grid>
      </Grid>
      <Divider sx={{ marginTop: 5, marginBottom: 2 }} />
      <Box>
        <Typography textAlign="center" variant="h5" color="#FF5F1F">
          {" "}
          Most Famous Products
        </Typography>
      </Box>
      <Box
        sx={{
          border: 2,
          marginTop: 2,
          boxShadow: 3,
          borderRadius: 10,
          padding: 2,
          m: 2,
          borderColor: "#FF5F1F",
        }}
      >
        <Swiper
          slidesPerView={isMatch ? 1.05 : 3.5}
          spaceBetween={20}
          centeredSlides={true}
          modules={[Pagination]}
          className="mySwiper"
        >
          {productList.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <ProductItem Item={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
      <FlexBox sx={{ marginTop: 2 }}>
        <Button variant="contained" onClick={() => navigate("/products")}>
          {" "}
          Search for more Product
        </Button>
      </FlexBox>
      <Divider sx={{ margin: 3 }} />
      <Box marginTop={3}>
        <Typography variant="h6" textAlign="center">
          Hello! are you interested in knowing more about our
          <Typography variant="inherit" color="#FF5F1F" textAlign="center">
            <Typewriter
              text={[" Future Discounts", "New Porducts", "Company News"]}
              loop={true}
              delay={2000}
              random={0}
              speed={50}
            />
          </Typography>
          Subuscribe to our news
        </Typography>
        <FlexBox
          component="form"
          sx={{
            marginTop: 2,
          }}
        >
          <TextField
            type="email"
            variant="filled"
            placeholder="user@mail.com"
            sx={{ width: 400 }}
          ></TextField>
        </FlexBox>
      </Box>
    </Box>
  );
};

export default Home;
