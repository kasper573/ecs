import { EditorStateReducer } from "../types/EditorStateReducer";
import { SystemDefinitionId } from "../../ecs-serializable/types/SystemDefinition";
import { remove } from "../../nominal";

export const deleteSystemDefinition: EditorStateReducer<SystemDefinitionId> = (
  { ecs: { systems } },
  { payload: id }
) => {
  if (!remove(systems, id)) {
    throw new Error("Could not remove system");
  }
};
