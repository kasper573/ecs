import { EditorState } from "../types/EditorState";

import { ComponentDefinitionId } from "../../ecs-serializable/types/ComponentDefinition";

export const selectComponentDefinition = (
  { ecs: { componentDefinitions } }: EditorState,
  id?: ComponentDefinitionId
) => (id ? componentDefinitions[id] : undefined);
