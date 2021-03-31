import { DragSourceMonitor } from "react-dnd";
import { DiscriminatedLibraryNode } from "../types/DiscriminatedLibraryNode";
import { DNDType } from "./DNDType";

export const libraryNodeDragSpec = (node: DiscriminatedLibraryNode) => ({
  options: { dropEffect: "move" },
  type: getDragTypeForNode(node),
  item: node as unknown,
  collect: (monitor: DragSourceMonitor) => ({
    isDragging: monitor.isDragging(),
    node,
  }),
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
