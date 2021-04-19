import * as zod from "zod";
import { NominalString } from "../../../ecs-common/src/NominalString";
import { genericString } from "../../../zod-extensions/genericString";

export type SystemDefinitionId = NominalString<"SystemDefinitionId">;

export type SystemDefinition = zod.infer<typeof systemDefinitionSchema>;

export const systemDefinitionIdSchema = genericString<SystemDefinitionId>();

export const systemDefinitionSchema = zod.object({
  id: systemDefinitionIdSchema,
  name: zod.string(),
});
