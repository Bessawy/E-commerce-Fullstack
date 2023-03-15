import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import EuroIcon from "@mui/icons-material/Euro";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";

import { ProductType } from "../../Types/product";
import { Item } from "../../utils/product_utils";
import { useAppDispatch } from "../../reduxhook/hooks";
import { addtoCart } from "../../redux/reducers/cartReducer";

const Image = (props: { img: string }) => {
  return (
    <Box
      component="img"
      sx={{
        height: 250,
        width: 300,
        border: 1,
        marginTop: 1,
      }}
      alt="No Image found"
      src={props.img}
    ></Box>
  );
};

const ProductItem = (props: { Item: ProductType }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <Paper sx={{ width: 320, marginTop: 1 }} elevation={24}>
      <Typography align="center" padding={1}>
        {props.Item.title}
      </Typography>
      <Divider />
      <Grid container spacing={1} padding={1}>
        <Grid
          item
          xs={12}
          justifyContent="center"
          alignItems="center"
          display="flex"
        >
          <Image img={props.Item.images[0]} />
        </Grid>
        <Grid item xs={12} sx={{ height: 100, marginBottom: 1 }}>
          <Item>
            <Typography variant="inherit">{props.Item.description}</Typography>
          </Item>
        </Grid>
        <Grid
          item
          xs={3}
          justifyContent="center"
          alignItems="center"
          display="flex"
        >
          <Item>
            <Typography
              variant="inherit"
              sx={{ fontSize: 14, fontWeight: 700 }}
              color="secondary"
            >
              {props.Item.price} <EuroIcon sx={{ fontSize: 12 }} />
            </Typography>
          </Item>
        </Grid>
        <Grid
          item
          xs={6}
          justifyContent="left"
          alignItems="center"
          display="flex"
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              dispatch(addtoCart(props.Item));
            }}
          >
            Add to Cart
          </Button>
        </Grid>
        <Grid
          item
          xs={3}
          justifyContent="center"
          alignItems="center"
          display="flex"
        >
          <IconButton
            onClick={() =>
              navigate("/products/" + props.Item.id, {
                state: props.Item,
              })
            }
          >
            <InfoIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductItem;
