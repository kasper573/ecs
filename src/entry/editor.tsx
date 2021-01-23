import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "../reportWebVitals";
import { EcsEditor } from "../packages/ecs-editor/ECSEditor";
import { App } from "../packages/shared-components/App";
import { System } from "../packages/ecs/System";

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <App>
        <EcsEditor system={new System()} />
      </App>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
