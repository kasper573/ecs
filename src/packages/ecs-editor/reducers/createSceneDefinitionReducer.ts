import { EditorStateReducer } from "../types/EditorStateReducer";
import { set } from "../../nominal";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";

export const createSceneDefinitionReducer: EditorStateReducer<SceneDefinition> = (
  { ecs: { scenes } },
  { payload: scene }
) => {
  set(scenes, scene.id, scene);
};
