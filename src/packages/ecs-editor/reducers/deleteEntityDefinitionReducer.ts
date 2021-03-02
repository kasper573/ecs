import { without } from "lodash";
import { EditorStateReducer } from "../types/EditorStateReducer";
import { selectEditorObjects } from "../functions/selectEditorObjects";
import { EntityDefinition } from "../../ecs-serializable/types/EntityDefinition";
import { reactToDeleteReducer } from "./reactToDeleteReducer";
import { updateLibraryReducer } from "./updateLibraryReducer";

export const deleteEntityDefinitionReducer: EditorStateReducer<EntityDefinition> = (
  state,
  entityDefinition
) => {
  const selected = selectEditorObjects(state);
  const deletedState = updateLibraryReducer(state, {
    system: selected.system,
    getUpdate: ({ entities }) => ({
      entities: without(entities, entityDefinition),
    }),
  });
  return reactToDeleteReducer(deletedState, {
    previousState: state,
    objectName: "entityDefinition",
    deletedObject: entityDefinition,
  });
};
