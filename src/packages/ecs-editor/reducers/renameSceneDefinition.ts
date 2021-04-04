import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { SceneDefinitionId } from "../../ecs-serializable/types/SceneDefinition";

export const renameSceneDefinition = createEditorStateReducer<{
  sceneId: SceneDefinitionId;
  name: string;
}>(({ ecs: { scenes } }, { payload: { sceneId, name } }) => {
  const scene = scenes[sceneId];
  if (!scene) {
    throw new Error("Scene not found");
  }

  scenes[sceneId] = { ...scene, name };
});
