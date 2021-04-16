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
import { auth0Config } from "../../../auth0Config";
import { createEditorState } from "./functions/createEditorState";
import { NativeComponentsContext } from "./NativeComponentsContext";
import { createStore } from "./store";
import { App } from "./App";
import {
  loadECSDefinitionFromLocalStorage,
  saveECSDefinitionToLocalStorage,
} from "./storage/lsECSDefinition";

const history = createBrowserHistory();
const store = createStore(history, {
  ...createEditorState(),
  ecs: loadECSDefinitionFromLocalStorage() ?? createECSDefinition(),
});

reaction(
  store,
  () => store.getState().editor.present.ecs,
  saveECSDefinitionToLocalStorage
);

function render() {
  // ConnectedRouter fires location changes twice in strict mode,
  // so to reduce verbose redux logs we render it outside strict mode
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <React.StrictMode>
          <DndProvider backend={HTML5Backend}>
            <NativeComponentsContext.Provider value={nativeComponents}>
              <Auth0Provider
                {...auth0Config}
                redirectUri={window.location.origin}
              >
                <App />
              </Auth0Provider>
            </NativeComponentsContext.Provider>
          </DndProvider>
        </React.StrictMode>
      </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
  );
}

render();
