import { DropTargetMonitor } from "react-dnd";
import { TypedLibraryNode } from "../types/TypedLibraryNode";
import { EditorState } from "../types/EditorState";
import { canMoveNodeTo } from "../tree/canMoveNodeTo";
import { CreateTreeOptions } from "../tree/createTree";
import { LibraryFolder } from "../../ecs-serializable/types/LibraryFolder";
import { LibraryNodeId } from "../../ecs-serializable/types/LibraryNode";
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
      ? canMoveNodeTo(
          Object.values(getEditorState().ecs.libraryFolders),
          draggedNodeId,
          targetNode.nodeId,
          treeOptions
        )
      : false;
    return {
      isOver,
      canDrop: isOver && canMove,
    };
  },
});

const treeOptions: CreateTreeOptions<LibraryFolder, LibraryNodeId> = {
  getId: (node) => node.nodeId,
  getParentId: (node) => node.parentNodeId,
};
