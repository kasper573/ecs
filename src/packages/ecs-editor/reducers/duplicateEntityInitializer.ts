import { get, set } from "../../ecs-common/nominal";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { uuid } from "../../ecs-common/uuid";
import {
  EntityInitializer,
  EntityInitializerId,
} from "../../ecs-serializable/types/EntityInitializer";

export const duplicateEntityInitializer = createEditorStateReducer<EntityInitializerId>(
  ({ ecs: { entityInitializers } }, { payload: id }) => {
    const initializer = get(entityInitializers, id);
    if (!initializer) {
      throw new Error("Could not find entity initializer to duplicate");
    }
    const duplicate: EntityInitializer = {
      ...initializer,
      id: uuid(),
      name: initializer.name + " Copy",
    };
    set(entityInitializers, duplicate.id, duplicate);
  }
);
