import { EditorState } from "../types/EditorState";
import { selectEditorObjects } from "../functions/selectEditorObjects";
import { EntityDefinition } from "../../ecs-serializable/types/EntityDefinition";
import { updateLibrary } from "./updateLibrary";

/**
 * Update the specified entity definition with a partial update
 */
export const updateEntityDefinition = (
  state: EditorState,
  entity: EntityDefinition,
  update: Partial<EntityDefinition>
): EditorState => {
  const { system } = selectEditorObjects(state);
  return updateLibrary(state, system, ({ entities }) => {
    const updatedEntities = entities.slice();
    const index = updatedEntities.indexOf(entity);
    updatedEntities[index] = { ...entity, ...update };
    return {
      entities: updatedEntities,
    };
  });
};
