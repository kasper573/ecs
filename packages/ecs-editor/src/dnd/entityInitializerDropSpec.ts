import { DropTargetHookSpec, DropTargetMonitor } from "react-dnd";
import { EditorState } from "../types/EditorState";
import { canMoveNodeTo } from "../tree/canMoveNodeTo";
import { CreateTreeOptions } from "../tree/createTree";
import {
  EntityInitializer,
  EntityInitializerId,
} from "../../../ecs-serializable/src/definition/EntityInitializer";
import { EntityDefinition } from "../../../ecs-serializable/src/definition/EntityDefinition";
import { DNDType } from "./DNDType";

export type EntityInitializerDropObject = EntityInitializer | EntityDefinition;
export type EntityInitializerDropObjectTyped =
  | { type: DNDType.EntityInitializer; initializer: EntityInitializer }
  | { type: DNDType.EntityDefinition; definition: EntityDefinition };

export const entityInitializerDropSpec = (
  targetNode: EntityInitializer | undefined,
  handleDrop: (dropped: EntityInitializerDropObjectTyped) => void,
  getEditorState: () => EditorState
): DropTargetHookSpec<
  EntityInitializerDropObject,
  any,
  { isOver: boolean; canDrop: boolean }
> => {
  const collect = (
    monitor: DropTargetMonitor<EntityInitializerDropObject | undefined>
  ) => {
    const isOver = monitor.isOver({ shallow: true });
    const dropped = getDropObjectTyped(monitor.getItem());
    const canMove =
      dropped?.type === DNDType.EntityInitializer
        ? canMoveNodeTo(
            Object.values(getEditorState().ecs.entityInitializers),
            dropped.initializer.id,
            targetNode?.id,
            treeOptions
          )
        : dropped?.type === DNDType.EntityDefinition;
    return {
      isOver,
      canDrop: isOver && canMove,
      dropped,
    };
  };
  return {
    drop: (item, monitor) => {
      const { dropped, canDrop } = collect(monitor);
      if (canDrop && dropped) {
        handleDrop(dropped);
      }
    },
    accept: [DNDType.EntityInitializer, DNDType.EntityDefinition],
    collect,
  };
};

function getDropObjectTyped(
  obj?: EntityInitializerDropObject
): EntityInitializerDropObjectTyped | undefined {
  if (!obj) {
    return;
  }
  if ("nodeId" in obj) {
    return { type: DNDType.EntityDefinition, definition: obj };
  }
  return { type: DNDType.EntityInitializer, initializer: obj };
}

const treeOptions: CreateTreeOptions<EntityInitializer, EntityInitializerId> = {
  getId: (node) => node.id,
  getParentId: (node) => node.parentId,
};
