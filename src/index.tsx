import React from "react";
import ReactDOM from "react-dom";
import App from "./packages/twitch-text-adventure/react/App";
import reportWebVitals from "./reportWebVitals";
import { theme } from "./packages/twitch-text-adventure/react/theme";
import { createGame } from "./packages/twitch-text-adventure/createGame";

ReactDOM.render(
  <React.StrictMode>
    <App theme={theme} system={createGame()} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
