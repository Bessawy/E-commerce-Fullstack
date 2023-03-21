import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

import { getReviewsType, reviewType } from "../../Types/review";

export const reviewintialstate: reviewType[] = [];

export const addReviewToServer = createAsyncThunk(
  "addReviewToServer",
  async (review: reviewType) => {
    try {
      const access_token = localStorage.getItem("JWT");
      const response = await axios.post(
        "https://localhost:7191/api/v1/my-reviews",
        {
          rate: review.rate,
          productid: review.productid,
          comment: review.comment,
          },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          }
        }
      );
      const data: reviewType = response.data;
      return data
    } catch (e) {
      throw new Error("Could not post the review!");
    }
  }
)

export const getUserReviewServer = createAsyncThunk(
  "getUserReviewServer",
  async (id: number) => {
    try {
      const access_token = localStorage.getItem("JWT");
      const response = await axios.get(
        "https://localhost:7191/api/v1/my-reviews/" + id,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          }
        }
      );
      const data: reviewType = response.data;
      return data
    } catch (e) {
      throw new Error("User review not found!");
    }
  }
)

export const deleteUserReviewServer = createAsyncThunk(
  "deleteUserReviewServer",
  async (id: number) => {
    try {
      const access_token = localStorage.getItem("JWT");
      const response = await axios.delete(
        "https://localhost:7191/api/v1/my-reviews/" + id,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          }
        }
      );
      const data = response.data;
      return data
    } catch (e) {
      throw new Error("User review not found!");
    }
  }
)

export const getAllReviewsFromServer = createAsyncThunk(
  "getAllReviewsFromServer",
  async (req: getReviewsType) => {
    try {
      const response = await axios.get(
        `https://localhost:7191/api/v1/products/${req.productid}/reviews?offset=${req.offset}&limit=${req.limit}`
      );
      const data: reviewType[] = response.data;
      return data
    } catch (e) {
      throw new Error("User review not found!");
    }
  }
)

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState: reviewintialstate,

  reducers: {
    emptyContainer: (state) => {
      return [];
    },
  },

  extraReducers: (build) => {
    build.addCase(getAllReviewsFromServer.fulfilled, (state, action) => {
      if (!action.payload) {
        return state;
      }
      action.payload.forEach(r => state.push(r));
    });
  },
});

const reviewReducer = reviewSlice.reducer;
export const {emptyContainer} = reviewSlice.actions;
export default reviewReducer;
