import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import './Styles/app.scss'

const container = document.getElementById("root")!;
const root = createRoot(container);

//   <React.StrictMode> render components twice on dev server!

root.render(
      <Provider store={store}>
        <App />
      </Provider>
);
