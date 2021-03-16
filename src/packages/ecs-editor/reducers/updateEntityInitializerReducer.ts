import { EditorStateReducer } from "../types/EditorStateReducer";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { selectEditorObjects } from "../selectors/selectEditorObjects";
import { updateSceneReducer } from "./updateSceneReducer";

export const updateEntityInitializerReducer: EditorStateReducer<{
  entityInitializer: EntityInitializer;
  update: Partial<EntityInitializer>;
}> = (state, { entityInitializer, update }) => {
  const { scene } = selectEditorObjects(state);
  if (!scene) {
    return state;
  }
  const updatedInstances = scene.entities.slice();
  const index = updatedInstances.indexOf(entityInitializer);
  updatedInstances[index] = { ...entityInitializer, ...update };
  return updateSceneReducer(state, {
    scene,
    update: {
      entities: updatedInstances,
    },
  });
};
