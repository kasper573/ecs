import { removeNominal } from "../../../ecs-common/src/removeNominal";
import { EntityInitializerId } from "../../../ecs-serializable/src/definition/EntityInitializer";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";

export const deleteEntityInitializer = createEditorStateReducer<EntityInitializerId>(
  ({ ecs: { entityInitializers } }, { payload: id }) => {
    const idQueue = [id];
    while (idQueue.length) {
      const id = idQueue.shift()!;
      const entity = entityInitializers[id];
      if (!entity) {
        throw new Error("Could not delete entity");
      }
      removeNominal(entityInitializers, id);
      const childIds = Object.values(entityInitializers)
        .filter((e) => e.parentId === id)
        .map((e) => e.id);
      idQueue.push(...childIds);
    }
  }
);
