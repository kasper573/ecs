import { EditorStateReducer } from "../types/EditorStateReducer";
import { EntityDefinition } from "../../ecs-serializable/types/EntityDefinition";
import { selectEditorObjects } from "../functions/selectEditorObjects";
import { updateLibraryReducer } from "./updateLibraryReducer";

export const updateEntityDefinitionReducer: EditorStateReducer<{
  entityDefinition: EntityDefinition;
  update: Partial<EntityDefinition>;
}> = (state, { entityDefinition, update }) => {
  const { system } = selectEditorObjects(state);
  return updateLibraryReducer(state, {
    system,
    getUpdate: ({ entities }) => {
      const updatedEntities = entities.slice();
      const index = updatedEntities.indexOf(entityDefinition);
      updatedEntities[index] = { ...entityDefinition, ...update };
      return {
        entities: updatedEntities,
      };
    },
  });
};
