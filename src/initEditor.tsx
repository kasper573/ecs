import React from "react";
import ReactDOM from "react-dom";
import { createGame } from "./packages/twitch-text-adventure/createGame";
import reportWebVitals from "./reportWebVitals";
import { EcsEditor } from "./packages/ecs-editor/ECSEditor";

export const initEditor = () => {
  const system = createGame();

  function render() {
    ReactDOM.render(
      <React.StrictMode>
        <EcsEditor system={system} />
      </React.StrictMode>,
      document.getElementById("root")
    );
  }

  render();

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
};
