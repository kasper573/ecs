import { DropTargetMonitor } from "react-dnd";
import { TypedLibraryNode } from "../types/TypedLibraryNode";
import { EditorState } from "../types/EditorState";
import { canMoveLibraryNodeTo } from "../functions/canMoveLibraryNodeTo";
import { DNDType } from "./DNDType";

export const libraryNodeDropSpec = (
  targetNode: TypedLibraryNode,
  handleDrop: (node: TypedLibraryNode) => void,
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
    const draggedNodeId = monitor.getItem<TypedLibraryNode | undefined>()
      ?.nodeId;
    const canMove = draggedNodeId
      ? canMoveLibraryNodeTo(getEditorState(), draggedNodeId, targetNode.nodeId)
      : false;
    return {
      isOver,
      canDrop: isOver && canMove,
    };
  },
});
