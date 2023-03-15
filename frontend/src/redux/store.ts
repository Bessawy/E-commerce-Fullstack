import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import productReducer from "./reducers/productReducer";
import themeReducer from "./reducers/themeModeReducer";
import userReducer from "./reducers/userReducer";
import cartReducer from "./reducers/cartReducer";

export const createStore = () => {
  return configureStore({
    reducer: { productReducer, themeReducer, userReducer, cartReducer},
  });
}

const saveState = (state: RootState) => {
  try {
      const cartReducer = JSON.stringify(state.cartReducer)
      const themeReducer = state.themeReducer
      localStorage.setItem('cart', cartReducer)
      localStorage.setItem('theme', themeReducer)
  } catch (e) {
    throw new Error('couldnot persist state')
  }
}

export const store = createStore()
store.subscribe(()=>saveState(store.getState()))

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
