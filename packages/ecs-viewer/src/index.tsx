import React from "react";
import ReactDOM from "react-dom";
import { getSystemIdFromParams } from "./getSystemIdFromParams";
import { App } from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App id={getSystemIdFromParams()} />
  </React.StrictMode>,
  document.getElementById("root")
);
