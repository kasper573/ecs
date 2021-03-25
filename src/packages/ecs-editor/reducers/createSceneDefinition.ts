import { set } from "../../nominal";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";

export const createSceneDefinition = createEditorStateReducer<SceneDefinition>(
  ({ ecs: { scenes } }, { payload: scene }) => {
    set(scenes, scene.id, scene);
  }
);
