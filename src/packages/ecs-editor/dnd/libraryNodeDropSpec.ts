import { DropTargetHookSpec, DropTargetMonitor } from "react-dnd";
import { TypedLibraryNode } from "../types/TypedLibraryNode";
import { EditorState } from "../types/EditorState";
import { canMoveNodeTo } from "../tree/canMoveNodeTo";
import { CreateTreeOptions } from "../tree/createTree";
import { LibraryFolder } from "../../ecs-serializable/types/LibraryFolder";
import { LibraryNodeId } from "../../ecs-serializable/types/LibraryNode";
import { DNDType } from "./DNDType";

export const libraryNodeDropSpec = (
  targetNode: TypedLibraryNode | undefined,
  handleDrop: (node: TypedLibraryNode) => void,
  getEditorState: () => EditorState
): DropTargetHookSpec<
  TypedLibraryNode,
  any,
  { canDrop: boolean; isOver: boolean }
> => {
  const collect = (monitor: DropTargetMonitor) => {
    const isOver = monitor.isOver({ shallow: true });
    const draggedNodeId = monitor.getItem<TypedLibraryNode | undefined>()
      ?.nodeId;
    const canMove = draggedNodeId
      ? canMoveNodeTo(
          Object.values(getEditorState().ecs.libraryFolders),
          draggedNodeId,
          targetNode?.nodeId,
          treeOptions
        )
      : false;
    return {
      isOver,
      canDrop: isOver && canMove,
    };
  };
  return {
    drop: (dragged, monitor) => {
      const { canDrop } = collect(monitor);
      if (canDrop) {
        handleDrop(dragged);
      }
    },
    // Can move library items to root or to folders
    accept:
      !targetNode || targetNode.type === "folder"
        ? [
            DNDType.EntityDefinition,
            DNDType.ComponentDefinition,
            DNDType.LibraryFolder,
          ]
        : [],
    collect,
  };
};

const treeOptions: CreateTreeOptions<LibraryFolder, LibraryNodeId> = {
  getId: (node) => node.nodeId,
  getParentId: (node) => node.parentNodeId,
};
