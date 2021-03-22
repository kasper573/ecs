import { EditorStateReducer } from "../types/EditorStateReducer";
import { SceneDefinitionId } from "../../ecs-serializable/types/SceneDefinition";
import { selectObjectReducer } from "./selectObjectReducer";

export const selectSceneReducer: EditorStateReducer<SceneDefinitionId> = (
  state,
  sceneId
) =>
  selectObjectReducer(state, { objectName: "scene", selectedValue: sceneId });
