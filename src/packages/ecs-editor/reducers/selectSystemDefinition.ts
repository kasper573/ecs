import { EditorStateReducer } from "../types/EditorStateReducer";
import { SystemDefinitionId } from "../../ecs-serializable/types/SystemDefinition";
import { setSelectedObject } from "./setSelectedObject";

export const selectSystemDefinition: EditorStateReducer<SystemDefinitionId> = (
  state,
  { payload: systemId }
) =>
  setSelectedObject(state, {
    objectName: "system",
    selectedValue: systemId,
  });
