import { EditorStateReducer } from "../types/EditorStateReducer";
import { SceneDefinitionId } from "../../ecs-serializable/types/SceneDefinition";
import { setSelectedObject } from "./setSelectedObject";

export const selectSceneDefinition: EditorStateReducer<SceneDefinitionId> = (
  state,
  { payload: sceneId }
) => setSelectedObject(state, { objectName: "scene", selectedValue: sceneId });
