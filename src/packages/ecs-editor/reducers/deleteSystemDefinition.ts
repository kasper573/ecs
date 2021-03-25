import { remove } from "../../nominal";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { SystemDefinitionId } from "../../ecs-serializable/types/SystemDefinition";

export const deleteSystemDefinition = createEditorStateReducer<SystemDefinitionId>(
  ({ ecs: { systems } }, { payload: id }) => {
    if (!remove(systems, id)) {
      throw new Error("Could not remove system");
    }
  }
);
