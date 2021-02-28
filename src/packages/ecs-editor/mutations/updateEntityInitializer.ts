import { EditorState } from "../types/EditorState";
import { selectEditorObjects } from "../functions/selectEditorObjects";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { updateScene } from "./updateScene";

/**
 * Update the specified entity instance with a partial update
 */
export const updateEntityInitializer = (
  state: EditorState,
  instance: EntityInitializer,
  update: Partial<EntityInitializer>
): EditorState => {
  const { scene } = selectEditorObjects(state);
  if (!scene) {
    return state;
  }
  const updatedInstances = scene.entities.slice();
  const index = updatedInstances.indexOf(instance);
  updatedInstances[index] = { ...instance, ...update };
  return updateScene(state, scene, {
    entities: updatedInstances,
  });
};
