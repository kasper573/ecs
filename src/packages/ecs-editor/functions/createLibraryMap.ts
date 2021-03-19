import { LibraryDefinition } from "../../ecs-serializable/types/LibraryDefinition";
import {
  LibraryNode,
  LibraryNodeId,
} from "../../ecs-serializable/types/LibraryNode";

/**
 * Creates a map of the nodes in a LibraryDefinition
 * (The node id is used as key)
 */
export const createLibraryMap = (library: LibraryDefinition) =>
  library.reduce(
    (map, node) => map.set(node.id, node),
    new Map<LibraryNodeId, LibraryNode>()
  );
