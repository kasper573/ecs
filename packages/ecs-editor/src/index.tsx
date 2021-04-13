import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Describable } from "../../ecs-text-adventure/src/describable/Describable";
import { Collectable } from "../../ecs-text-adventure/src/collectable/Collectable";
import { Interactive } from "../../ecs-text-adventure/src/interactive/Interactive";
import { Inventory } from "../../ecs-text-adventure/src/collectable/Inventory";
import { InteractionMemory } from "../../ecs-text-adventure/src/interactive/InteractionMemory";
import { SceneManager } from "../../ecs-scene-manager/src/SceneManager";
import { SceneSwitch } from "../../ecs-scene-manager/src/SceneSwitch";
import { TextAdventureRenderer } from "../../ecs-text-adventure/src/renderer/TextAdventureRenderer";
import { createECSDefinition } from "../../ecs-serializable/src/functions/createECSDefinition";
import { reaction } from "../../ecs-common/src/reaction";
import { createEditorState } from "./functions/createEditorState";
import { NativeComponentsContext } from "./NativeComponentsContext";
import { createStore } from "./store";
import { Editor } from "./editors/Editor";
import {
  loadECSDefinitionFromLocalStorage,
  saveECSDefinitionToLocalStorage,
} from "./storage/lsECSDefinition";

export const nativeComponents = {
  Describable,
  Collectable,
  Interactive,
  Inventory,
  InteractionMemory,
  SceneManager,
  SceneSwitch,
  TextAdventureRenderer,
};

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

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
// if (import.meta.hot) {
//   import.meta.hot.accept();
// }
