import { EditorStateReducer } from "../types/EditorStateReducer";
import { SystemDefinitionId } from "../../ecs-serializable/types/SystemDefinition";
import { selectObjectReducer } from "./selectObjectReducer";

export const selectSystemDefinitionReducer: EditorStateReducer<SystemDefinitionId> = (
  state,
  { payload: systemId }
) =>
  selectObjectReducer(state, {
    objectName: "system",
    selectedValue: systemId,
  });
