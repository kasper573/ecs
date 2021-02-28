import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "../reportWebVitals";
import { Editor } from "../packages/ecs-editor/Editor";
import { App } from "../packages/shared-components/App";
import { Describable } from "../packages/ecs-describable/Describable";
import { Collectable } from "../packages/ecs-collectable/Collectable";
import { SystemDefinition } from "../packages/ecs-serializable/types/SystemDefinition";
import { createSystemDefinition } from "../packages/ecs-serializable/factories/createSystemDefinition";

const availableComponents = {
  describable: Describable,
  collectable: Collectable,
};

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <App>
        <Editor
          defaultState={{
            nativeComponents: availableComponents,
            systems: [
              createSystemDefinition({ name: "System A" }, availableComponents),
              createSystemDefinition({ name: "System B" }, availableComponents),
              createSystemDefinition({ name: "System C" }, availableComponents),
            ] as SystemDefinition[],
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
