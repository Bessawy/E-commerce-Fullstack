import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

import { ProductType, ProductUpdateType } from "../../Types/product";

const ProductEditForm = (props: {
  product: ProductType;
  formHandler: (product: ProductUpdateType) => void;
}) => {
  const [title, setTitle] = useState<string>(props.product.title);
  const [price, setPrice] = useState<number>(props.product.price);
  const [description, setDescription] = useState<string>(
    props.product.description
  );

  return (
    <Box>
      <Box component="form">
        <TextField
          variant="standard"
          label="name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ m: 3, width: "30%" }}
        ></TextField>
        <TextField
          variant="standard"
          label="price"
          type="number"
          value={price}
          sx={{ m: 3, width: "30%" }}
          onChange={(e) => setPrice(parseInt(e.target.value))}
        ></TextField>
        <Box>
          <TextField
            variant="outlined"
            label="Description"
            multiline
            rows={4}
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ m: 3, width: "50%" }}
          ></TextField>
        </Box>
      </Box>
      <Box>
        <Button
          sx={{ margin: 3 }}
          type="submit"
          variant="outlined"
          onClick={() =>
            props.formHandler({
              id: props.product.id,
              title: title,
              price: price,
              description: description,
            })
          }
        >
          {" "}
          Edit Product{" "}
        </Button>
      </Box>
    </Box>
  );
};

export default ProductEditForm;
