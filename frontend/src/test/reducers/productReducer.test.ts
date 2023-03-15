import { AnyAction, ThunkMiddleware } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

import {
  addProductServer,
  deleteItemServer,
  fetchAllProduct,
  updateItemServer,
} from "../../redux/reducers/productReducer";
import { createStore, RootState } from "../../redux/store";
import { ProductCreateType, ProductType } from "../../Types/product";
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

beforeEach(() => {
  customStore = createStore();
});

describe("Test products actions", () => {
  test("Should return initial state", () => {
    expect(customStore.getState().productReducer.length).toBe(0);
  });

  test("fetch all products", async () => {
    await customStore.dispatch(fetchAllProduct());
    expect(customStore.getState().productReducer.length).toBeGreaterThan(0);
  });

  test("should create new product", async () => {
    const newProduct: ProductCreateType = {
      title: "Test create Product",
      price: 1000,
      description: "Test",
      categoryId: 1,
      images: [],
    };

    const currentLength = customStore.getState().productReducer.length;
    await customStore.dispatch(addProductServer(newProduct));
    expect(customStore.getState().productReducer.length).toBe(
      currentLength + 1
    );
  });

  test("should not create a product with no title", async () => {
    const newProduct: ProductCreateType = {
      title: "",
      price: 1000,
      description: "Test",
      categoryId: 1,
      images: [],
    };

    const currentLength = customStore.getState().productReducer.length;
    await customStore.dispatch(addProductServer(newProduct));
    expect(customStore.getState().productReducer.length).toBe(currentLength);
  });

  test("should not create a product with price less than 0", async () => {
    const newProduct: ProductCreateType = {
      title: "This title",
      price: -1000,
      description: "Test",
      categoryId: 1,
      images: [],
    };

    const currentLength = customStore.getState().productReducer.length;
    await customStore.dispatch(addProductServer(newProduct));
    expect(customStore.getState().productReducer.length).toBe(currentLength);
  });

  test("should delete an existing product", async () => {
    await customStore.dispatch(fetchAllProduct());
    const currentLength = customStore.getState().productReducer.length;
    await customStore.dispatch(deleteItemServer(2));
    expect(customStore.getState().productReducer.length).toBe(
      currentLength - 1
    );
  });

  test("should not delete non existing product", async () => {
    await customStore.dispatch(fetchAllProduct());
    const currentLength = customStore.getState().productReducer.length;
    await customStore.dispatch(deleteItemServer(100));
    expect(customStore.getState().productReducer.length).toBe(currentLength);
  });

  test("should change an existing item", async () => {
    await customStore.dispatch(fetchAllProduct());
    const editedProduct: ProductType = {
      id: 2,
      title: "New title",
      price: 5000,
      description: " New description ",
      images: [
        "https://api.lorem.space/image/shoes?w=640&h=480&r=2497",
        "https://api.lorem.space/image/shoes?w=640&h=480&r=5307",
        "https://api.lorem.space/image/shoes?w=640&h=480&r=4464",
      ],
      category: {
        id: 4,
        name: "Shoes",
        image: "https://api.lorem.space/image/shoes?w=640&h=480&r=5514",
      },
    };
    await customStore.dispatch(updateItemServer(editedProduct));
    const editedVersion = { ...customStore.getState().productReducer[0] };
    expect(
      editedVersion.title === editedProduct.title &&
        editedVersion.description === editedProduct.description &&
        editedVersion.price === editedProduct.price
    );
  });

  test("should not change an existing item with no title", async () => {
    await customStore.dispatch(fetchAllProduct());
    const editedProduct: ProductType = {
      id: 2,
      title: "",
      price: 5000,
      description: " New description ",
      images: [
        "https://api.lorem.space/image/shoes?w=640&h=480&r=2497",
        "https://api.lorem.space/image/shoes?w=640&h=480&r=5307",
        "https://api.lorem.space/image/shoes?w=640&h=480&r=4464",
      ],
      category: {
        id: 4,
        name: "Shoes",
        image: "https://api.lorem.space/image/shoes?w=640&h=480&r=5514",
      },
    };
    await customStore.dispatch(updateItemServer(editedProduct));
    const editedVersion = { ...customStore.getState().productReducer[0] };
    expect(
      editedVersion.title !== editedProduct.title &&
        editedVersion.description !== editedProduct.description &&
        editedVersion.price !== editedProduct.price
    );
  });

  test("should not change an existing item with price less than 0", async () => {
    await customStore.dispatch(fetchAllProduct());
    const editedProduct: ProductType = {
      id: 2,
      title: "New title",
      price: -5000,
      description: " New description ",
      images: [
        "https://api.lorem.space/image/shoes?w=640&h=480&r=2497",
        "https://api.lorem.space/image/shoes?w=640&h=480&r=5307",
        "https://api.lorem.space/image/shoes?w=640&h=480&r=4464",
      ],
      category: {
        id: 4,
        name: "Shoes",
        image: "https://api.lorem.space/image/shoes?w=640&h=480&r=5514",
      },
    };
    await customStore.dispatch(updateItemServer(editedProduct));
    const editedVersion = { ...customStore.getState().productReducer[0] };
    expect(
      editedVersion.title !== editedProduct.title &&
        editedVersion.description !== editedProduct.description &&
        editedVersion.price !== editedProduct.price
    );
  });

  test("should not change non existing item", async () => {
    await customStore.dispatch(fetchAllProduct());
    const products: ProductType[] = customStore.getState().productReducer;
    const editedProduct: ProductType = {
      id: 100,
      title: "New title",
      price: 5000,
      description: " New description ",
      images: [
        "https://api.lorem.space/image/shoes?w=640&h=480&r=2497",
        "https://api.lorem.space/image/shoes?w=640&h=480&r=5307",
        "https://api.lorem.space/image/shoes?w=640&h=480&r=4464",
      ],
      category: {
        id: 4,
        name: "Shoes",
        image: "https://api.lorem.space/image/shoes?w=640&h=480&r=5514",
      },
    };
    await customStore.dispatch(updateItemServer(editedProduct));
    const indicator = products.find((item) => item.title === "New title");
    expect(indicator).toBe(undefined);
  });
});

export {};
