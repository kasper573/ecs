import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { canMoveNodeTo } from "../tree/canMoveNodeTo";
import { CreateTreeOptions } from "../tree/createTree";
import {
  EntityInitializer,
  EntityInitializerId,
} from "../../../ecs-serializable/src/definition/EntityInitializer";
import { reorderEntityInitializers } from "../functions/reorderEntityInitializers";

export const moveEntityInitializer = createEditorStateReducer<{
  id: EntityInitializerId;
  targetId: EntityInitializerId | undefined;
  order?: number;
}>(({ ecs: { entityInitializers } }, { payload: { id, targetId, order } }) => {
  const list = Object.values(entityInitializers);
  if (!canMoveNodeTo(list, id, targetId, treeOptions)) {
    throw new Error("Illegal entity initializer move");
  }

  // Find node to mutate
  const moved = entityInitializers[id];
  if (!moved) {
    throw new Error("Could not find entity initializer to move");
  }

  moved.parentId = targetId;
  reorderEntityInitializers(list, moved, order);
});

const treeOptions: CreateTreeOptions<EntityInitializer, EntityInitializerId> = {
  getId: (node) => node.id,
  getParentId: (node) => node.parentId,
};
