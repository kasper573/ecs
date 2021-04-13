import { NominalString } from "../../../ecs-common/src/NominalString";

export type SystemDefinitionId = NominalString<"SystemDefinitionId">;

export type SystemDefinition = {
  id: SystemDefinitionId;
  name: string;
};
