import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { SceneDefinitionId } from "../../ecs-serializable/types/SceneDefinition";
import { setSelectedObject } from "./setSelectedObject";

export const setSelectedSceneDefinition = createEditorStateReducer<SceneDefinitionId>(
  (state, { payload: sceneId }) =>
    setSelectedObject(state, { objectName: "scene", selectedValue: sceneId })
);
