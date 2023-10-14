import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { store } from "./logic/store";
import { Provider } from "react-redux";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
