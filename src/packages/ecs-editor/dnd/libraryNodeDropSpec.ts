import { DropTargetMonitor } from "react-dnd";
import { DiscriminatedLibraryNode } from "../types/DiscriminatedLibraryNode";
import { EditorState } from "../types/EditorState";
import { canMoveLibraryNodeTo } from "../functions/canMoveLibraryNodeTo";
import { DNDType } from "./DNDType";

export const libraryNodeDropSpec = (
  targetNode: DiscriminatedLibraryNode,
  handleDrop: (node: DiscriminatedLibraryNode) => void,
  getEditorState: () => EditorState
) => ({
  drop: handleDrop,
  accept:
    targetNode.type === "folder"
      ? [
          DNDType.EntityDefinition,
          DNDType.ComponentDefinition,
          DNDType.LibraryFolder,
        ]
      : [],
  collect: (monitor: DropTargetMonitor) => ({
    acceptsDrop:
      monitor.isOver({ shallow: true }) &&
      canMoveLibraryNodeTo(
        getEditorState(),
        monitor.getItem<DiscriminatedLibraryNode>().nodeId,
        targetNode.nodeId
      ),
  }),
});
