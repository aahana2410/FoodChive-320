import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import { disableReactDevTools } from "@fvilers/disable-react-devtools";
// import * as dotenv from "dotenv";

// dotenv.config();
// require("dotenv").config();
// if (ProcessingInstruction.env.NODE_ENV === "production") disableReactDevTools();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
