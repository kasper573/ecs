import { EditorState } from "../types/EditorState";
import { EntityDefinitionId } from "../../ecs-serializable/types/EntityDefinition";
import { get } from "../../nominal";
import { selectLibraryDefinitions } from "./selectLibraryDefinitions";

export const selectEntityDefinition = (id?: EntityDefinitionId) => (
  state: EditorState
) => (id ? get(selectLibraryDefinitions(state).entities, id) : undefined);
