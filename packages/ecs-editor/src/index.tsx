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
import { auth0Config } from "../../../auth0Config";
import { Describable } from "../../ecs-text-adventure/src/describable/Describable";
import { Collectable } from "../../ecs-text-adventure/src/collectable/Collectable";
import { Interactive } from "../../ecs-text-adventure/src/interactive/Interactive";
import { Inventory } from "../../ecs-text-adventure/src/collectable/Inventory";
import { InteractionMemory } from "../../ecs-text-adventure/src/interactive/InteractionMemory";
import { SceneManager } from "../../ecs-scene-manager/src/SceneManager";
import { SceneSwitch } from "../../ecs-scene-manager/src/SceneSwitch";
import { TextAdventureRenderer } from "../../ecs-text-adventure/src/renderer/TextAdventureRenderer";
import { ecsDefinitionSchema } from "../../ecs-serializable/src/definition/ECSDefinition";
import { App } from "./App";
import { createStore } from "./store";
import { NativeComponentsContext } from "./NativeComponentsContext";
import { createEditorState } from "./functions/createEditorState";
import { loadZodFromLS, saveZodToLS } from "./storage/zodLocalStorage";
import { windowStateSchema } from "./features/window/WindowState";
import { defaultWindowState } from "./fixtures/defaultWindowState";

const history = createBrowserHistory();
const store = createStore(history, {
  ...createEditorState(),
  ecs: loadZodFromLS("ecs", ecsDefinitionSchema) ?? createECSDefinition(),
  windows: loadZodFromLS("windows", windowStateSchema) ?? defaultWindowState,
});

reaction(
  store,
  () => store.getState().editor.present.ecs,
  (ecs) => saveZodToLS("ecs", ecsDefinitionSchema, ecs)
);

reaction(
  store,
  () => store.getState().editor.present.windows,
  (windows) => saveZodToLS("windows", windowStateSchema, windows)
);

const nativeComponents = {
  Describable,
  Collectable,
  Interactive,
  Inventory,
  InteractionMemory,
  SceneManager,
  SceneSwitch,
  TextAdventureRenderer,
};

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
