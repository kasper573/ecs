import { EditorStateReducer } from "../types/EditorStateReducer";
import { SystemDefinitionId } from "../../ecs-serializable/types/SystemDefinition";
import { selectObjectReducer } from "./selectObjectReducer";

export const selectSystemReducer: EditorStateReducer<SystemDefinitionId> = (
  state,
  systemId
) =>
  selectObjectReducer(state, {
    objectName: "system",
    selectedValue: systemId,
  });
