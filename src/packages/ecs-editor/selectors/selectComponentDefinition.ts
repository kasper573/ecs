import { EditorState } from "../types/EditorState";
import { get } from "../../nominal";
import { ComponentDefinitionId } from "../../ecs-serializable/types/ComponentDefinition";
import { selectLibraryDefinitions } from "./selectLibraryDefinitions";

export const selectComponentDefinition = (id?: ComponentDefinitionId) => (
  state: EditorState
) => (id ? get(selectLibraryDefinitions(state).components, id) : undefined);
