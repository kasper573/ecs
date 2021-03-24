import { EditorStateReducer } from "../types/EditorStateReducer";
import { SceneDefinitionId } from "../../ecs-serializable/types/SceneDefinition";
import { selectObjectReducer } from "./selectObjectReducer";

export const selectSceneDefinitionReducer: EditorStateReducer<SceneDefinitionId> = (
  state,
  { payload: sceneId }
) =>
  selectObjectReducer(state, { objectName: "scene", selectedValue: sceneId });
