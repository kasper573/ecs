import { EditorStateReducer } from "../types/EditorStateReducer";
import {
  EntityInitializer,
  EntityInitializerId,
} from "../../ecs-serializable/types/EntityInitializer";
import { get, set } from "../../nominal";

export const updateEntityInitializerReducer: EditorStateReducer<{
  entityId: EntityInitializerId;
  update: Partial<EntityInitializer>;
}> = ({ ecs: { entities } }, { payload: { entityId, update } }) => {
  const entity = get(entities, entityId);
  if (!entity) {
    throw new Error("Entity initializer not found");
  }
  set(entities, entityId, { ...entity, ...update });
};
