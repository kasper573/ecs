import { DropTargetMonitor } from "react-dnd";
import { EditorState } from "../types/EditorState";
import { canMoveNodeTo } from "../tree/canMoveNodeTo";
import { CreateTreeOptions } from "../tree/createTree";
import {
  EntityInitializer,
  EntityInitializerId,
} from "../../ecs-serializable/types/EntityInitializer";
import { DNDType } from "./DNDType";

export const entityInitializerDropSpec = (
  targetNode: EntityInitializer,
  handleDrop: (node: EntityInitializer) => void,
  getEditorState: () => EditorState
) => ({
  drop: handleDrop,
  accept: DNDType.EntityInitializer,
  collect: (monitor: DropTargetMonitor) => {
    const isOver = monitor.isOver({ shallow: true });
    const draggedNodeId = monitor.getItem<EntityInitializer | undefined>()?.id;
    const canMove = draggedNodeId
      ? canMoveNodeTo(
          Object.values(getEditorState().ecs.entityInitializers),
          draggedNodeId,
          targetNode.id,
          treeOptions
        )
      : false;
    return {
      isOver,
      canDrop: isOver && canMove,
    };
  },
});

const treeOptions: CreateTreeOptions<EntityInitializer, EntityInitializerId> = {
  getId: (node) => node.id,
  getParentId: (node) => node.parentId,
};
