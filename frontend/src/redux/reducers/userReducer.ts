import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { CreateUserType, UserType } from "../../Types/user";

export const userinttialstate: UserType = {
  id: 0,
  name: "Guest",
  role: "customer",
  email: "",
  password: "",
  avatar: "",
};

export const editUserServer = createAsyncThunk(
  "editUserServer",
  async (user: UserType) => {
    try {
      const response = await axios.put(
        "https://api.escuelajs.co/api/v1/users/" + user.id,
        {
          email: user.email,
          password: user.password,
          name: user.name,
        }
      );
      const data: UserType = response.data;
      return data
    } catch (e) {
      throw new Error("Couldnot edit user");
    }
  }
);

export const createUser = createAsyncThunk(
  "createUser",
  async (user: CreateUserType) => {
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/users/",
        user
      );
      const data: UserType|Error = response.data;
      return data;
    } catch (e) {
      throw new Error("Cannot add new user");
    }
  }
);

export const JWTLogin = createAsyncThunk("tokenLogin", async () => {
  try {
    const access_token = localStorage.getItem("JWT");

    if (!access_token) {
      return userinttialstate;
    }

    const userResponse = await axios.get(
      "https://api.escuelajs.co/api/v1/auth/profile",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const newUser: UserType = await userResponse.data;
    return newUser;
  } catch (e) {
    throw new Error("JWT Login failed!");
  }
});

export const UserLogin = createAsyncThunk(
  "UserLogin",
  async (user: { email: string; password: string }, { dispatch }) => {
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        user
      );
      const data = await response.data;
      localStorage.setItem("JWT", data.access_token);
      await dispatch(JWTLogin());
    } catch (e) {
      throw new Error("Login failed");
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState: userinttialstate,

  reducers: {
    logUser: (state, action: PayloadAction<UserType>) => {
      return action.payload;
    },
    signOutUser: (state) => {
      localStorage.removeItem("JWT");
      return userinttialstate;
    },
  },

  extraReducers: (build) => {
    build.addCase(createUser.fulfilled, (state, action) => {
      //return action.payload;
    });
    build.addCase(JWTLogin.fulfilled, (state, action) => {
      return action.payload;
    });
    build.addCase(
      editUserServer.fulfilled,
      (state, action: PayloadAction<UserType>) => {
        return action.payload;
      }
    );
  },
});

const userReducer = userSlice.reducer;
export const { logUser, signOutUser } = userSlice.actions;
export default userReducer;
