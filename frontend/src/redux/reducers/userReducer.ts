import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import Config from "./../../config.json"

import { CreateUserType, UserPasswordType, UserType } from "../../Types/user";

export const userinttialstate: UserType = {
  id: 0,
  name: "Guest",
  role: "customer",
  email: "",
  password: "",
  avatar: "",
};

export const googleLoginServer = createAsyncThunk(
  "googleLoginServer",
  async (access_token: string, { dispatch }) => {
    try {
      const response = await axios.post(
        `https://${Config.AzureServer}/api/v1/google/login`,
        {
          credential: access_token
        });
        
      const data = await response.data;
      localStorage.setItem("JWT", data.token);
      await dispatch(JWTLogin());
    } catch (e) {
      throw new Error("Login failed");
    }
  }
);

export const editUserServer = createAsyncThunk(
  "editUserServer",
  async (user: UserType) => {
    try {
      const access_token = localStorage.getItem("JWT");
      const response = await axios.post(
        `https://${Config.AzureServer}/api/v1/users/profile/info`,
        {
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          }
        }
      );
      const data: UserType = response.data;
      return data
    } catch (e) {
      throw new Error("Couldnot edit user");
    }
  }
);

export const changePasswordServer = createAsyncThunk(
  "changePasswordServer",
  async (passwords: UserPasswordType) => {
    try {
      const access_token = localStorage.getItem("JWT");
      const response = await axios.post(
        `https://${Config.AzureServer}/api/v1/users/profile/password`,
        {
          oldpassword: passwords.oldpassword,
          newpassword: passwords.newpassword,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          }
        }
      );
      const data = response.data;
      return data
    } catch (e) {
      throw new Error("Couldnot change password");
    }
  }
);

export const createUser = createAsyncThunk(
  "createUser",
  async (user: CreateUserType) => {
    try {
      const response = await axios.post(
        `https://${Config.AzureServer}/api/v1/users/signup`,
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
      `https://${Config.AzureServer}/api/v1/users/profile`,
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
        `https://${Config.AzureServer}/api/v1/users/signin`,
        user
      );
      const data = await response.data;
      localStorage.setItem("JWT", data.token);
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
