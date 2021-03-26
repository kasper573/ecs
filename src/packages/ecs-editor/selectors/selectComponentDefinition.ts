import { EditorState } from "../types/EditorState";
import { get } from "../../nominal";
import { ComponentDefinitionId } from "../../ecs-serializable/types/ComponentDefinition";

export const selectComponentDefinition = (id?: ComponentDefinitionId) => ({
  ecs: { componentDefinitions },
}: EditorState) => (id ? get(componentDefinitions, id) : undefined);
