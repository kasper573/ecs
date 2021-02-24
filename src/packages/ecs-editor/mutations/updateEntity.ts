import { EditorState } from "../types/EditorState";
import { selectEditorObjects } from "../functions/selectEditorObjects";
import { SerializedEntity } from "../types/SerializedEntity";
import { updateScene } from "./updateScene";

/**
 * Update the specified entity with a partial update
 */
export const updateEntity = (
  state: EditorState,
  entity: SerializedEntity,
  update: Partial<SerializedEntity>
): EditorState => {
  const { scene } = selectEditorObjects(state);
  if (!scene) {
    return state;
  }
  const updatedEntities = scene.entities.slice();
  const index = updatedEntities.indexOf(entity);
  updatedEntities[index] = { ...entity, ...update };
  return updateScene(state, scene, {
    entities: updatedEntities,
  });
};
