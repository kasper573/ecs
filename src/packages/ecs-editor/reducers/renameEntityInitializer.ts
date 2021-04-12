import { EntityInitializerId } from "../../ecs-serializable/definition/EntityInitializer";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";

export const renameEntityInitializer = createEditorStateReducer<{
  entityId: EntityInitializerId;
  name: string;
}>(({ ecs: { entityInitializers } }, { payload: { entityId, name } }) => {
  const entity = entityInitializers[entityId];
  if (!entity) {
    throw new Error("Entity initializer not found");
  }
  entityInitializers[entityId] = { ...entity, name };
});
