import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Grid,
  Rating,
  TextField,
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
import { addToCart } from "../../redux/reducers/cartReducer";
import ProductForm from "./ProductEditForm";
import {
  deleteItemServer,
  updateItemServer,
} from "../../redux/reducers/productReducer";
import { FlexBox } from "../../Styles/Themes/styledComp";
import {
  addReviewToServer,
  deleteUserReviewServer,
  emptyContainer,
  getAllReviewsFromServer,
  getUserReviewServer,
} from "../../redux/reducers/reviewReducer";
import { getReviewsType, reviewType } from "../../Types/review";
import { Reviews } from "@mui/icons-material";

const ProductInfo = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const stateObj = useLocation();

  const [product, setProduct] = useState<ProductType>(stateObj.state);
  const [comment, setComment] = useState<string>("");
  const [value, setValue] = useState<number | null>(0);
  const [deleteExp, setDeleteExp] = React.useState<true | false>(false);
  const [editExp, seteditExp] = React.useState<true | false>(false);
  const [myReview, SetMyReview] = React.useState<reviewType | null>(null);
  const [counter, SetCounter] = React.useState<number>(0);
  var reviewsCounter = 0;

  const user = useAppSelector((state) => state.userReducer);
  const reviews = useAppSelector((state) => state.reviewReducer);
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
      behavior: "smooth",
    });
  };

  const addreviewsHandler = () => {
    const req: getReviewsType = {
      productid: product.id,
      offset: 0 + 5 * counter,
      limit: 5 + 5 * counter,
    };
    dispatch(getAllReviewsFromServer(req)).then((res) => {
      SetCounter(counter + 1)
    });
  };

  const addReviewHandler = () => {
    const n: number = value ? value : 0;
    const review: reviewType = {
      rate: n,
      comment: comment,
      productid: product.id,
    };
    dispatch(addReviewToServer(review)).then((res) => SetMyReview(review));
  };

  const removeReviewHandler = () => {
    dispatch(deleteUserReviewServer(product.id)).then((res) =>
      SetMyReview(null)
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    dispatch(emptyContainer());
    dispatch(getUserReviewServer(product.id))
      .then((res) => SetMyReview(res.payload as reviewType))
      .catch((res) => SetMyReview(null));
    addreviewsHandler();
  }, []);

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
                    dispatch(addToCart(product));
                  }}
                >
                  {" "}
                  Add to Cart
                </Button>
              </GridItem>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <GridItem>
              <Typography variant="h6">
                {product.numberOfReviews + " reviews"}
              </Typography>
              <Rating name="read-only" value={product.rating} readOnly />
            </GridItem>
          </Grid>
          {myReview && (
            <Grid item xs={12} sx={{marginTop: 2}}>
              <GridItem>
                <Typography variant="h6">My Review</Typography>
              </GridItem>
              <FlexBox sx={{ margin: 2 }}>
                <Typography
                  sx={{ fontSize: 20, fontWeight: 400, marginRight: 2 }}
                >
                  {myReview.comment}
                </Typography>
                <Rating name="read-only" value={myReview.rate} readOnly />
              </FlexBox>
            </Grid>
          )}
          <Grid item xs={12}>
            {!myReview && (
              <FlexBox>
                <TextField
                  variant="standard"
                  label="comment"
                  value={comment}
                  sx={{ m: 3, width: "40%" }}
                  onChange={(e) => setComment(e.target.value)}
                ></TextField>
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </FlexBox>
            )}
            <FlexBox>
              <Button
                onClick={() => addReviewHandler()}
                disabled={myReview ? true : false}
              >
                Add Review
              </Button>
              <Button
                onClick={() => removeReviewHandler()}
                disabled={myReview ? false : true}
              >
                Delete Review
              </Button>
            </FlexBox>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ marginRight: 5, marginLeft: 5 }}>
          <GridItem>Reviews</GridItem>
        </Grid>
        {reviews.map((e, i) => {
          return (
            <Grid item key={i} xs={12}>
              <Grid container sx={{ marginRight: 5, marginLeft: 5 }}>
                <Grid item xs={3}>
                  <GridItem>{"Username( " + e.userName + " )"}</GridItem>
                </Grid>
                <Grid item xs={4}>
                  <FlexBox>
                    <Rating name="read-only" value={e.rate} readOnly />
                  </FlexBox>
                </Grid>
                <Grid item xs={4}>
                  {e.comment}
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
      <Grid item xs={12} sx={{ marginTop: 5}}>
        <FlexBox>
          <Button
            disabled={counter*5 > reviews.length ? true : false}
            onClick = {()=> addreviewsHandler()}
          >
            {" "}
            Add Reviews{" "}
          </Button>
        </FlexBox>
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
                onClick={() => (editExp ? seteditExp(false) : seteditExp(true))}
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
