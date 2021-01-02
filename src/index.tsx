import React from "react";
import ReactDOM from "react-dom";
import App from "./packages/react-text-adventure/App";
import reportWebVitals from "./reportWebVitals";
import { theme } from "./packages/react-text-adventure/theme";
import { createWorld } from "./packages/text-adventure/world";

ReactDOM.render(
  <React.StrictMode>
    <App theme={theme} world={createWorld()} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
