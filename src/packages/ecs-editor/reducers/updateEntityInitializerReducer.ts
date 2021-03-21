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
    console.warn(
      `Could not update entity initializer: System and scene must be specified`,
      {
        system,
        scene,
        entityInitializer,
      }
    );
    return state;
  }
  const updatedInstances = scene.entities.slice();
  const index = updatedInstances.indexOf(entityInitializer);
  if (index === -1) {
    console.warn(`Could not update entity initializer: Not found in scene`, {
      scene,
      system,
      entityInitializer,
    });
    return state;
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
