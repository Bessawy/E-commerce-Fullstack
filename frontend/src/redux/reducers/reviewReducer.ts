import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { reviewType } from "../../Types/review";

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

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState: reviewintialstate,

  reducers: {
  },

  extraReducers: (build) => {
    build.addCase(getUserReviewServer.fulfilled, (state, action) => {
    });
  },
});

const reviewReducer = reviewSlice.reducer;
export const {} = reviewSlice.actions;
export default reviewReducer;
