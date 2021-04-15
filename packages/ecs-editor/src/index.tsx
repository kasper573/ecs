import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Auth0Provider } from "@auth0/auth0-react";
import { createBrowserHistory } from "history";
import { ConnectedRouter } from "connected-react-router";
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

const history = createBrowserHistory();
const store = createStore(history, {
  ...createEditorState(),
  ecs: loadECSDefinitionFromLocalStorage() ?? createECSDefinition(),
  selection: loadSelectionFromLocalStorage() ?? {},
});

reaction(
  store,
  () => store.getState().editor.present.ecs,
  saveECSDefinitionToLocalStorage
);

reaction(
  store,
  () => store.getState().editor.present.selection,
  saveSelectionToLocalStorage
);

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <DndProvider backend={HTML5Backend}>
        <NativeComponentsContext.Provider value={nativeComponents}>
          <Provider store={store}>
            <ConnectedRouter history={history}>
              <Auth0Provider {...auth0Config}>
                <App />
              </Auth0Provider>
            </ConnectedRouter>
          </Provider>
        </NativeComponentsContext.Provider>
      </DndProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

render();
