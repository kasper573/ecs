import { EditorState } from "../types/EditorState";
import { EntityDefinitionId } from "../../ecs-serializable/types/EntityDefinition";
import { get } from "../../nominal";

export const selectEntityDefinition = (id?: EntityDefinitionId) => ({
  ecs: { entityDefinitions },
}: EditorState) => (id ? get(entityDefinitions, id) : undefined);
