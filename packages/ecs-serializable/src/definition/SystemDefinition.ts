import { NominalString } from "../../../ecs-common/NominalString";

export type SystemDefinitionId = NominalString<"SystemDefinitionId">;

export type SystemDefinition = {
  id: SystemDefinitionId;
  name: string;
};
