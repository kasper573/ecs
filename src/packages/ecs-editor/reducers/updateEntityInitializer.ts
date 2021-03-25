import { get, set } from "../../nominal";
import {
  EntityInitializer,
  EntityInitializerId,
} from "../../ecs-serializable/types/EntityInitializer";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";

export const updateEntityInitializer = createEditorStateReducer<{
  entityId: EntityInitializerId;
  update: Partial<EntityInitializer>;
}>(({ ecs: { entities } }, { payload: { entityId, update } }) => {
  const entity = get(entities, entityId);
  if (!entity) {
    throw new Error("Entity initializer not found");
  }
  set(entities, entityId, { ...entity, ...update });
});
