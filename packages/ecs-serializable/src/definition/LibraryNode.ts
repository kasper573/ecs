import * as zod from "zod";
import { NominalString } from "../../../ecs-common/src/NominalString";
import { genericString } from "../../../zod-extensions/genericString";
import { systemDefinitionIdSchema } from "./SystemDefinition";

export type LibraryNodeId = NominalString<"LibraryNodeId">;

export type LibraryNode = zod.infer<typeof libraryNodeSchema>;

export const libraryNodeIdSchema = genericString<LibraryNodeId>();

export const libraryNodeSchema = zod.object({
  /**
   * The nodeId and parentNodeId is used to arrange library nodes in a tree
   */
  nodeId: libraryNodeIdSchema,
  parentNodeId: libraryNodeIdSchema.optional(),
  /**
   * Used for presentation
   */
  name: zod.string(),
  /**
   * The id of the system this node belongs to
   */
  systemId: systemDefinitionIdSchema,
});
