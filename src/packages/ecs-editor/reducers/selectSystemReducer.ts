import { EditorStateReducer } from "../types/EditorStateReducer";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { selectObjectReducer } from "./selectObjectReducer";

export const selectSystemReducer: EditorStateReducer<SystemDefinition> = (
  state,
  system
) =>
  selectObjectReducer(state, {
    objectName: "system",
    selectedValue: system.id,
  });
