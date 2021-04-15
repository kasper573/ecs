import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Auth0Provider } from "@auth0/auth0-react";
import { createECSDefinition } from "../../ecs-serializable/src/functions/createECSDefinition";
import { reaction } from "../../ecs-common/src/reaction";
import nativeComponents from "../../ecs-native-components";
import { createEditorState } from "./functions/createEditorState";
import { NativeComponentsContext } from "./NativeComponentsContext";
import { createStore } from "./store";
import { App } from "./App";
import {
  loadECSDefinitionFromLocalStorage,
  saveECSDefinitionToLocalStorage,
} from "./storage/lsECSDefinition";
import { auth0Config } from "./fixtures/auth0Config";
import {
  loadSelectionFromLocalStorage,
  saveSelectionToLocalStorage,
} from "./storage/lsSelection";

const store = createStore({
  ...createEditorState(),
  ecs: loadECSDefinitionFromLocalStorage() ?? createECSDefinition(),
  selection: loadSelectionFromLocalStorage() ?? {},
});

reaction(
  store,
  () => store.getState().present.ecs,
  saveECSDefinitionToLocalStorage
);

reaction(
  store,
  () => store.getState().present.selection,
  saveSelectionToLocalStorage
);

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <DndProvider backend={HTML5Backend}>
        <NativeComponentsContext.Provider value={nativeComponents}>
          <Provider store={store}>
            <Auth0Provider {...auth0Config}>
              <App />
            </Auth0Provider>
          </Provider>
        </NativeComponentsContext.Provider>
      </DndProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

render();
