import { remove } from "../../nominal";
import { EntityInitializerId } from "../../ecs-serializable/types/EntityInitializer";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";

export const deleteEntityInitializer = createEditorStateReducer<EntityInitializerId>(
  ({ ecs: { entities } }, { payload: id }) => {
    if (!remove(entities, id)) {
      throw new Error("Could not remove entity");
    }
  }
);
