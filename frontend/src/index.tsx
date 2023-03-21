import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import "./Styles/app.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";

const container = document.getElementById("root")!;
const root = createRoot(container);

//   <React.StrictMode> render components twice on dev server!

root.render(
  <Provider store={store}>
    <GoogleOAuthProvider 
      clientId="911014612250-jvn41k4rb0efcqfu81o26maje624p2ta.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
