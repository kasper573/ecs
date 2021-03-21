import { without } from "lodash";
import { EditorStateReducer } from "../types/EditorStateReducer";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { selectSelectedSystem } from "../selectors/selectSelectedSystem";
import { selectSelectedScene } from "../selectors/selectSelectedScene";
import { reactToDeleteReducer } from "./reactToDeleteReducer";
import { updateSceneReducer } from "./updateSceneReducer";

export const deleteEntityInitializerReducer: EditorStateReducer<{
  system?: SystemDefinition;
  scene?: SceneDefinition;
  entityInitializer: EntityInitializer;
}> = (
  state,
  {
    system = selectSelectedSystem(state),
    scene = selectSelectedScene(state, system),
    entityInitializer,
  }
) => {
  if (!system || !scene) {
    console.warn(
      `Could not delete entity initializer: System and scene must be specified`,
      {
        scene,
        system,
        entityInitializer,
      }
    );
    return state;
  }
  const deletedState = updateSceneReducer(state, {
    system,
    scene,
    update: {
      entities: without(scene.entities, entityInitializer),
    },
  });
  return reactToDeleteReducer(deletedState, {
    previousState: state,
    objectName: "inspected",
    didDelete: (selected) => selected?.object === entityInitializer,
  });
};
