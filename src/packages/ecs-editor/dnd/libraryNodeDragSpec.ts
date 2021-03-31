import { DiscriminatedLibraryNode } from "../types/DiscriminatedLibraryNode";
import { DNDType } from "./DNDType";

export const libraryNodeDragSpec = (node: DiscriminatedLibraryNode) => ({
  options: { dropEffect: "move" },
  type: getDragTypeForNode(node),
  item: node as unknown,
});

function getDragTypeForNode(node: DiscriminatedLibraryNode) {
  switch (node.type) {
    case "component":
      return DNDType.ComponentDefinition;
    case "entity":
      return DNDType.EntityDefinition;
    case "folder":
      return DNDType.LibraryFolder;
  }
}
