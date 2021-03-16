import { EditorStateReducer } from "../types/EditorStateReducer";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { selectSelectedSystem } from "../selectors/selectSelectedSystem";
import { updateSystemReducer } from "./updateSystemReducer";

export const updateSceneReducer: EditorStateReducer<{
  scene: SceneDefinition;
  update: Partial<SceneDefinition>;
}> = (state, { scene, update }) => {
  const system = selectSelectedSystem(state);
  if (!system) {
    return state;
  }
  const updatedScenes = system.scenes.slice();
  const index = updatedScenes.indexOf(scene);
  updatedScenes[index] = { ...scene, ...update };
  return updateSystemReducer(state, {
    system,
    update: {
      scenes: updatedScenes,
    },
  });
};
