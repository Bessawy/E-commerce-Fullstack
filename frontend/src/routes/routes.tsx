import { createBrowserRouter } from "react-router-dom";

import Cart from "../Pages/cart/Cart";
import Home from "../Pages/Home";
import Notfound from "../Pages/NotFound";
import Createproduct from "../Pages/product/CreateProduct";
import Products from "../Pages/product/Products";
import ProductInfo from "../Pages/product/ProductInfo";
import { Routes } from "../Pages/Routes";
import Login from "../Pages/userlog/Login";
import Profile from "../Pages/userlog/ProfilePage";
import ProtectAdmin from "../Pages/userlog/ProtectedAdmin";
import ProtectLogin from "../Pages/userlog/ProtectedLogin";
import Register from "../Pages/userlog/Register";
import Users from "../Pages/userlog/Users";

const router = createBrowserRouter([
  {
    path: "",
    element: <Routes />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:id",
        element: <ProductInfo />,
      },
      {
        path: "users",
        element: (
          <ProtectAdmin>
            <Users />
          </ProtectAdmin>
        ),
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "createproduct",
        element: <Createproduct />,
      },
      {
        path: "profile",
        element: (
          <ProtectLogin>
            <Profile />
          </ProtectLogin>
        ),
      },
      {
        path: "*",
        element: <Notfound />,
      },
      {},
    ],
  },
  {
    path: "signin",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Register />,
  },
]);

export default router;
