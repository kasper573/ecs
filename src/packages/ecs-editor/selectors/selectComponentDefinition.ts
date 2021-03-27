import { EditorState } from "../types/EditorState";
import { get } from "../../ecs-common/nominal";
import { ComponentDefinitionId } from "../../ecs-serializable/types/ComponentDefinition";

export const selectComponentDefinition = (
  { ecs: { componentDefinitions } }: EditorState,
  id?: ComponentDefinitionId
) => (id ? get(componentDefinitions, id) : undefined);
