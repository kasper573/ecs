import { EditorStateReducer } from "../types/EditorStateReducer";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { selectObjectReducer } from "./selectObjectReducer";

export const selectSceneReducer: EditorStateReducer<SceneDefinition> = (
  state,
  scene
) => selectObjectReducer(state, { objectName: "scene", selectedObject: scene });
