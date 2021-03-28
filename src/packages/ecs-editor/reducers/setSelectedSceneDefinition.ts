import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { SceneDefinitionId } from "../../ecs-serializable/types/SceneDefinition";
import {
  setSelectedObject,
  setSelectedObjectAction,
} from "./setSelectedObject";

export const setSelectedSceneDefinition = createEditorStateReducer<
  SceneDefinitionId | undefined
>((state, { payload: sceneId }) =>
  setSelectedObject(
    state,
    setSelectedObjectAction({ type: "scene", value: sceneId })
  )
);
