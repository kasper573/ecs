import { get, set } from "../../ecs-common/nominal";
import { EntityInitializerId } from "../../ecs-serializable/types/EntityInitializer";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";

export const renameEntityInitializer = createEditorStateReducer<{
  entityId: EntityInitializerId;
  name: string;
}>(({ ecs: { entityInitializers } }, { payload: { entityId, name } }) => {
  const entity = get(entityInitializers, entityId);
  if (!entity) {
    throw new Error("Entity initializer not found");
  }
  set(entityInitializers, entityId, { ...entity, name });
});
