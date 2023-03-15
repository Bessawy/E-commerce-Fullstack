import { AnyAction, ThunkMiddleware } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

import { addtoCart, removeFromCart } from "../../redux/reducers/cartReducer";
import { fetchAllProduct } from "../../redux/reducers/productReducer";
import { createStore, RootState } from "../../redux/store";
import server from "../shared/server";

let customStore: ToolkitStore<
  RootState,
  AnyAction,
  [ThunkMiddleware<RootState, AnyAction, undefined>]
>;

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  customStore = createStore();
});

describe("Test cart actions", () => {
  test("should return intial state", () => {
    expect(customStore.getState().cartReducer.length).toBe(0);
  });

  test("should add product to cart", async () => {
    await customStore.dispatch(fetchAllProduct());
    const product = customStore.getState().productReducer;
    customStore.dispatch(addtoCart(product[0]));
    expect(customStore.getState().cartReducer.length).toBe(1);
  });

  test("should increase the count of existing product", async () => {
    await customStore.dispatch(fetchAllProduct());
    const product = customStore.getState().productReducer;
    customStore.dispatch(addtoCart(product[0]));
    customStore.dispatch(addtoCart(product[0]));
    expect(customStore.getState().cartReducer[0].count).toBe(2);
  });

  test("should delete product from the cart", async () => {
    await customStore.dispatch(fetchAllProduct());
    const product = customStore.getState().productReducer;
    customStore.dispatch(addtoCart(product[0]));
    customStore.dispatch(removeFromCart(0));
    expect(customStore.getState().cartReducer.length).toBe(0);
  });

  test("should reduce the count of product from the cart", async () => {
    await customStore.dispatch(fetchAllProduct());
    const product = customStore.getState().productReducer;
    customStore.dispatch(addtoCart(product[0]));
    customStore.dispatch(addtoCart(product[0]));
    customStore.dispatch(removeFromCart(0));
    expect(customStore.getState().cartReducer[0].count).toBe(1);
  });
});
