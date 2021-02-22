import { EditorState } from "../types/EditorState";
import { selectEditorObjects } from "../functions/selectEditorObjects";
import { SerializableEntity } from "../types/SerializableEntity";
import { updateScene } from "./updateScene";

/**
 * Update the specified entity with a partial update
 */
export const updateEntity = (
  state: EditorState,
  entity: SerializableEntity,
  update: Partial<SerializableEntity>
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
