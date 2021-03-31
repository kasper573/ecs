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
  collect: (monitor: DropTargetMonitor) => {
    const isOver = monitor.isOver({ shallow: true });
    const draggedNodeId = monitor.getItem<
      DiscriminatedLibraryNode | undefined
    >()?.nodeId;
    const canMove = draggedNodeId
      ? canMoveLibraryNodeTo(getEditorState(), draggedNodeId, targetNode.nodeId)
      : false;
    return {
      isOver,
      canDrop: isOver && canMove,
    };
  },
});
