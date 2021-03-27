import { get, set } from "../../ecs-common/nominal";
import {
  EntityInitializer,
  EntityInitializerId,
} from "../../ecs-serializable/types/EntityInitializer";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";

export const updateEntityInitializer = createEditorStateReducer<{
  entityId: EntityInitializerId;
  update: Partial<EntityInitializer>;
}>(({ ecs: { entityInitializers } }, { payload: { entityId, update } }) => {
  const entity = get(entityInitializers, entityId);
  if (!entity) {
    throw new Error("Entity initializer not found");
  }
  set(entityInitializers, entityId, { ...entity, ...update });
});
