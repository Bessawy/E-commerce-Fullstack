import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import EuroIcon from "@mui/icons-material/Euro";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { EffectCube, Navigation, Pagination } from "swiper";
import "swiper/css/effect-cube";
import "swiper/css";
import "swiper/css/pagination";

import { ProductType, ProductUpdateType } from "../../Types/product";
import GridItem from "../../Styles/Themes/gridTheme";
import { useAppDispatch, useAppSelector } from "../../reduxhook/hooks";
import { addtoCart } from "../../redux/reducers/cartReducer";
import ProductForm from "./ProductEditForm";
import {
  deleteItemServer,
  updateItemServer,
} from "../../redux/reducers/productReducer";

const ProductInfo = () => {
  const stateObj = useLocation();
  const [product, setProduct] = useState<ProductType>(stateObj.state);
  const [deleteExp, setDeleteExp] = React.useState<true | false>(false);
  const [editExp, seteditExp] = React.useState<true | false>(false);
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const deleteProduct = () => {
    dispatch(deleteItemServer(product.id));
    navigate("/products");
  };

  const editItemHandler = (newItem: ProductUpdateType) => {
    let newProduct = { ...product };
    newProduct.title = newItem.title;
    newProduct.price = newItem.price;
    newProduct.description = newItem.description;
    setProduct(newProduct);
    dispatch(updateItemServer(newProduct));
    seteditExp(false);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Box marginTop={20} marginLeft={4} marginRight={4}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5} sx={{ width: "100%", height: "100%" }}>
          <Swiper
            modules={[EffectCube, Navigation, Pagination]}
            navigation={true}
            pagination={{ clickable: true }}
            grabCursor={true}
            effect="cube"

            centeredSlides
          >
            {product.images.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <Box
                    component="img"
                    src={item}
                    alt={"Error Loading the Image"}
                    sx={{ width: "100%", height: 400 }}
                  ></Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Grid>
        <Grid item xs={12} md={7} sx={{ width: "100%", height: "100%" }}>
          <GridItem>
            <Typography variant="h6">{product.title}</Typography>
          </GridItem>
          <GridItem>
            <Typography>{product.description}</Typography>
          </GridItem>
          <Grid container sx={{ height: "100%" }}>
            <Grid item xs={6}>
              <GridItem>
                <Typography variant="h6"> Category</Typography>
                <Divider sx={{ marginBottom: 3 }} />
                <GridItem>
                  <Typography>ID</Typography>
                  <Divider />
                  <Typography> {product.category.id}</Typography>
                </GridItem>
                <GridItem>
                  <Typography>Name</Typography>
                  <Divider />
                  <Typography> {product.category.name}</Typography>
                </GridItem>
              </GridItem>
            </Grid>
            <Grid item xs={6}>
              <GridItem>
                <Typography variant="h6">Price</Typography>
                <Divider sx={{ marginBottom: 3 }} />
                <Typography
                  variant="inherit"
                  sx={{ fontSize: 14, fontWeight: 700 }}
                  color="secondary"
                >
                  {product.price} <EuroIcon sx={{ fontSize: 12 }} />
                </Typography>
              </GridItem>
              <GridItem sx={{ height: "54%" }}>
                <Button
                  variant="contained"
                  sx={{ marginTop: 4 }}
                  onClick={(e) => {
                    dispatch(addtoCart(product));
                  }}
                >
                  {" "}
                  Add to Cart
                </Button>
              </GridItem>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {user.role === "admin" && (
        <Box sx={{ marginTop: 8 }}>
          <Accordion expanded={editExp}>
            <AccordionSummary
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Edit Product
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                {product.title}
              </Typography>
              <Button
                onClick={() =>
                  editExp ? seteditExp(false) : seteditExp(true)
                }
                sx={{ marginLeft: "auto" }}
              >
                <ExpandMoreIcon fontSize="small" />
              </Button>
            </AccordionSummary>
            <AccordionDetails>
              <ProductForm product={product} formHandler={editItemHandler} />
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={deleteExp}>
            <AccordionSummary
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Delete Product
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                {product.title}
              </Typography>
              <Button
                onClick={() =>
                  deleteExp ? setDeleteExp(false) : setDeleteExp(true)
                }
                sx={{ marginLeft: "auto" }}
              >
                <ExpandMoreIcon fontSize="small" />
              </Button>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {" "}
                Are you sure you want to{" "}
                <Button onClick={() => deleteProduct()}>Delete</Button> this
                Item?
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      )}
    </Box>
  );
};

export default ProductInfo;
