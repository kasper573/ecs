import { TypedLibraryNode } from "../types/TypedLibraryNode";
import { DNDType } from "./DNDType";

export const libraryNodeDragSpec = (node: TypedLibraryNode) => ({
  options: { dropEffect: "move" },
  type: getDragTypeForNode(node),
  item: node as unknown,
});

function getDragTypeForNode(node: TypedLibraryNode) {
  switch (node.type) {
    case "component":
      return DNDType.ComponentDefinition;
    case "entity":
      return DNDType.EntityDefinition;
    case "folder":
      return DNDType.LibraryFolder;
  }
}
