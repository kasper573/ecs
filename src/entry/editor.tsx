import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import reportWebVitals from "../reportWebVitals";
import { App } from "../packages/shared-components/App";
import { Describable } from "../packages/ecs-describable/Describable";
import { Collectable } from "../packages/ecs-collectable/Collectable";
import { Interactive } from "../packages/ecs-interactive/Interactive";
import { Editor } from "../packages/ecs-editor/editors/Editor";
import { createStore } from "../packages/ecs-editor/store";
import defaultECS from "./defaultECS.json";

export const nativeComponents = {
  describable: Describable,
  collectable: Collectable,
  interactive: Interactive,
};

const store = createStore(
  { ecs: defaultECS, selection: {}, nativeComponents },
  nativeComponents
);

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App>
          <Editor />
        </App>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
