import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "../reportWebVitals";
import { Editor } from "../packages/ecs-editor/editors/Editor";
import { App } from "../packages/shared-components/App";
import { Describable } from "../packages/ecs-describable/Describable";
import { Collectable } from "../packages/ecs-collectable/Collectable";
import { SystemDefinition } from "../packages/ecs-serializable/types/SystemDefinition";
import { Interactive } from "../packages/ecs-interactive/Interactive";
import systemDefinitionsJson from "./defaultEditorSystems.json";

export const nativeComponents = {
  describable: Describable,
  collectable: Collectable,
  interactive: Interactive,
};

const systemDefinitions = (systemDefinitionsJson as object) as SystemDefinition[];

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <App>
        <Editor
          nativeComponents={nativeComponents}
          defaultState={{ systems: systemDefinitions, selection: {} }}
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
