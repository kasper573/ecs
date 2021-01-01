import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { theme } from "./fixtures/theme";
import { world } from "./world";

ReactDOM.render(
  <React.StrictMode>
    <App theme={theme} world={world} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
