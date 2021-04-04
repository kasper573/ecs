import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";

export const createSceneDefinition = createEditorStateReducer<SceneDefinition>(
  ({ ecs: { scenes } }, { payload: scene }) => {
    scenes[scene.id] = scene;
  }
);
