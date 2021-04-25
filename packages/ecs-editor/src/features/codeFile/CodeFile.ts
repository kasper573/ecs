import { ComponentDefinitionId } from "../../../../ecs-serializable/src/definition/ComponentDefinition";

export type CodeFileId = CodeFile["id"];

export type CodeFile = {
  id: ComponentDefinitionId;
  order: number;
};
