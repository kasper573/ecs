import { EditorStateReducer } from "../types/EditorStateReducer";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { selectSelectedSystem } from "../selectors/selectSelectedSystem";
import { selectSelectedScene } from "../selectors/selectSelectedScene";
import { updateSceneReducer } from "./updateSceneReducer";

export const updateEntityInitializerReducer: EditorStateReducer<{
  system?: SystemDefinition;
  scene?: SceneDefinition;
  entityInitializer: EntityInitializer;
  update: Partial<EntityInitializer>;
}> = (
  state,
  {
    system = selectSelectedSystem(state),
    scene = selectSelectedScene(state, system),
    entityInitializer,
    update,
  }
) => {
  if (!system || !scene) {
    throw new Error(`System and scene must be specified`);
  }
  const updatedInstances = scene.entities.slice();
  const index = updatedInstances.indexOf(entityInitializer);
  if (index === -1) {
    throw new Error(`Entity initializer not found in scene`);
  }
  updatedInstances[index] = { ...entityInitializer, ...update };
  return updateSceneReducer(state, {
    system,
    scene,
    update: {
      entities: updatedInstances,
    },
  });
};
