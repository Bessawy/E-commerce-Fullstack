import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

import {
  ModifyProductType,
  ProductCreateType,
  ProductType,
} from "../../Types/product";

const intialstate: ProductType[] = [];

export const fetchAllProduct = createAsyncThunk("fetchProducts", async () => {
  try {
    const response = await axios.get(
      "https://api.escuelajs.co/api/v1/products"
    );
    const data: ProductType[]|Error = await response.data;
    return data;
  } catch (e: any) {
    throw new Error(e.message);
  }
});

export const fetchSingleProduct = createAsyncThunk(
  "fetchSingleProducts",
  async (id: number) => {
    try {
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/products/" + id
      );
      const data = await response.data;
      return data;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
);

export const addProductServer = createAsyncThunk(
  "addProductToBackendServer",
  async (product: ProductCreateType) => {
    try {
      const response: AxiosResponse<ProductType, ProductType> =
        await axios.post("https://api.escuelajs.co/api/v1/products/", {
          title: product.title,
          price: product.price,
          description: product.description,
          categoryId: product.categoryId,
          images: product.images,
        });
      const data: ProductType|Error = response.data;
      return data;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
);

export const updateItemServer = createAsyncThunk(
  "modifyProductonServer",
  async (Item: ProductType, { dispatch }) => {
    try {
      const response = await axios.put(
        "https://api.escuelajs.co/api/v1/products/" + Item.id,
        {
          title: Item.title,
          price: Item.price,
          description: Item.description,
        }
      );
      const data: ProductType = await response.data;
      dispatch(modifyItem({ update: data }));
      return data;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
);

export const deleteItemServer = createAsyncThunk(
  "deleteProduct",
  async (id: number, { dispatch }) => {
    try {
      const response = await axios.delete(
        "https://api.escuelajs.co/api/v1/products/" + id
      );
      dispatch(deleteItem(id));
      return response.data;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
);

const productSlice = createSlice({
  name: "productSlice",
  initialState: intialstate,
  
  reducers: {
    addItems: (state, action) => {
      return action.payload;
    },
    pushItem: (state, action: PayloadAction<ProductType>) => {
      state.push(action.payload);
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      return state.filter((item) => item.id !== action.payload);
    },
    modifyItem: (state, action: PayloadAction<ModifyProductType>) => {
      if (action.payload.index) {
        state[action.payload.index] = action.payload.update;
      } else {
        const index = state.findIndex(
          (item) => item.id === action.payload.update.id
        );
        state[index] = action.payload.update;
      }
    },
    sortProducts: (state, action: PayloadAction<"asc" | "desc">) => {
      if (action.payload === "asc") {
        state.sort((a, b) => a.title.localeCompare(b.title));
      } else if (action.payload === "desc") {
        state.sort((a, b) => b.title.localeCompare(a.title));
      }
    },
  },

  extraReducers: (build) => {
    build.addCase(fetchAllProduct.fulfilled, (state, action) => {
      if (action.payload && "message" in action.payload) {
        return state;
      } else if (!action.payload) {
        return state;
      }
      return action.payload;
    });
    build.addCase(fetchAllProduct.rejected, (state, action) => {
      return state;
    });
    build.addCase(
      fetchSingleProduct.fulfilled,
      (state: ProductType[], action: PayloadAction<ProductType>) => {
        const find = state.find((item) => item.id === action.payload.id);
        if (find) {
          return state;
        } else {
          state.push(action.payload);
        }
      }
    );
    build.addCase(addProductServer.fulfilled, (state, action) => {
      if (action.payload) {
        state.push(action.payload);
      } else {
        return state;
      }
    });
    build.addCase(
      updateItemServer.fulfilled,
      (state: ProductType[], action) => {
        const index = state.findIndex((item) => item.id === action.payload.id);
        state[index] = action.payload;
      }
    );
  },
});

const productReducer = productSlice.reducer;
export const { deleteItem, modifyItem } = productSlice.actions;
export default productReducer;
