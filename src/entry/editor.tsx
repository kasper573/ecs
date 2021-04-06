import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import reportWebVitals from "../reportWebVitals";
import { Describable } from "../packages/ecs-text-adventure/describable/Describable";
import { Collectable } from "../packages/ecs-text-adventure/collectable/Collectable";
import { Interactive } from "../packages/ecs-text-adventure/interactive/Interactive";
import { Editor } from "../packages/ecs-editor/editors/Editor";
import { createStore } from "../packages/ecs-editor/store";
import { NativeComponentsContext } from "../packages/ecs-editor/NativeComponentsContext";
import { createEditorState } from "../packages/ecs-editor/functions/createEditorState";
import { ECSDefinition } from "../packages/ecs-serializable/types/ECSDefinition";
import { Inventory } from "../packages/ecs-text-adventure/collectable/Inventory";
import { InteractionMemory } from "../packages/ecs-text-adventure/interactive/InteractionMemory";
import { SceneManager } from "../packages/ecs-scene-manager/SceneManager";
import { SceneSwitch } from "../packages/ecs-scene-manager/SceneSwitch";
import { TextAdventureRenderer } from "../packages/ecs-text-adventure/renderer/TextAdventureRenderer";
import exampleECS from "./exampleECS.json";

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
  ecs: (exampleECS as unknown) as ECSDefinition,
});

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
