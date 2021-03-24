import { EditorStateReducer } from "../types/EditorStateReducer";
import { EntityInitializerId } from "../../ecs-serializable/types/EntityInitializer";
import { remove } from "../../nominal";

export const deleteEntityInitializer: EditorStateReducer<EntityInitializerId> = (
  { ecs: { entities } },
  { payload: id }
) => {
  if (!remove(entities, id)) {
    throw new Error("Could not remove entity");
  }
};
