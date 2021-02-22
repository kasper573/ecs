import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "../reportWebVitals";
import { Editor } from "../packages/ecs-editor/Editor";
import { App } from "../packages/shared-components/App";
import { createSystem } from "../packages/ecs-editor/functions/factories";

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <App>
        <Editor
          defaultState={{
            systems: [
              createSystem("System A"),
              createSystem("System B"),
              createSystem("System C"),
            ],
          }}
        />
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
