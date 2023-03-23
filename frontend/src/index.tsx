import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import "./Styles/app.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Config from "./config.json"

const container = document.getElementById("root")!;
const root = createRoot(container);

//   <React.StrictMode> render components twice on dev server!

root.render(
  <Provider store={store}>
    <GoogleOAuthProvider 
      clientId={Config.ClientId}>
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
