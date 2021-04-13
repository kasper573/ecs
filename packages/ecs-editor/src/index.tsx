import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { createECSDefinition } from "../../ecs-serializable/src/functions/createECSDefinition";
import { reaction } from "../../ecs-common/src/reaction";
import nativeComponents from "../../ecs-native-components";
import { createEditorState } from "./functions/createEditorState";
import { NativeComponentsContext } from "./NativeComponentsContext";
import { createStore } from "./store";
import { Editor } from "./editors/Editor";
import {
  loadECSDefinitionFromLocalStorage,
  saveECSDefinitionToLocalStorage,
} from "./storage/lsECSDefinition";

const store = createStore({
  ...createEditorState(),
  ecs: loadECSDefinitionFromLocalStorage() ?? createECSDefinition(),
});

reaction(
  store,
  () => store.getState().present.ecs,
  saveECSDefinitionToLocalStorage
);

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <DndProvider backend={HTML5Backend}>
        <NativeComponentsContext.Provider value={nativeComponents}>
          <Provider store={store}>
            <Editor />
          </Provider>
        </NativeComponentsContext.Provider>
      </DndProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

render();
