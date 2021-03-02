import { EditorStateReducer } from "../types/EditorStateReducer";
import { selectEditorObjects } from "../functions/selectEditorObjects";
import { createEntityDefinition } from "../../ecs-serializable/factories/createEntityDefinition";
import { EntityDefinition } from "../../ecs-serializable/types/EntityDefinition";
import { updateLibraryReducer } from "./updateLibraryReducer";

export const createEntityDefinitionReducer: EditorStateReducer<EntityDefinition> = (
  state,
  entityDefinition
) =>
  updateLibraryReducer(state, {
    system: selectEditorObjects(state).system,
    getUpdate: ({ entities }) => ({
      entities: [...entities, createEntityDefinition(entityDefinition)],
    }),
  });
