import { NominalString } from "../../../ecs-common/NominalString";
import { SystemDefinitionId } from "./SystemDefinition";

export type LibraryNodeId = NominalString<"LibraryNodeId">;

export type LibraryNode = {
  /**
   * The nodeId and parentNodeId is used to arrange library nodes in a tree
   */
  nodeId: LibraryNodeId;
  parentNodeId?: LibraryNodeId;
  /**
   * Used for presentation
   */
  name: string;
  /**
   * The id of the system this node belongs to
   */
  systemId: SystemDefinitionId;
};
