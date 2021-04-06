import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { canMoveNodeTo } from "../tree/canMoveNodeTo";
import { CreateTreeOptions } from "../tree/createTree";
import {
  EntityInitializer,
  EntityInitializerId,
} from "../../ecs-serializable/types/EntityInitializer";

export const moveEntityInitializer = createEditorStateReducer<{
  id: EntityInitializerId;
  targetId: EntityInitializerId;
}>(({ ecs: { entityInitializers } }, { payload: { id, targetId } }) => {
  const list = Object.values(entityInitializers);
  if (!canMoveNodeTo(list, id, targetId, treeOptions)) {
    throw new Error("Illegal entity initializer move");
  }

  // Find node to mutate
  const entity = entityInitializers[id];
  if (!entity) {
    throw new Error("Could not find entity initializer to move");
  }
  entity.parentId = targetId;
});

const treeOptions: CreateTreeOptions<EntityInitializer, EntityInitializerId> = {
  getId: (node) => node.id,
  getParentId: (node) => node.parentId,
};
