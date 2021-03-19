import { without } from "lodash";
import { EditorStateReducer } from "../types/EditorStateReducer";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { reactToDeleteReducer } from "./reactToDeleteReducer";

export const deleteSystemReducer: EditorStateReducer<SystemDefinition> = (
  state,
  system
) => {
  const deletedState = {
    ...state,
    systems: without(state.systems, system),
  };
  return reactToDeleteReducer(deletedState, {
    previousState: state,
    objectName: "system",
    didDelete: (selectedSystem) => selectedSystem === system,
  });
};
