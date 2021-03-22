import { without } from "lodash";
import { EditorStateReducer } from "../types/EditorStateReducer";
import { SystemDefinitionId } from "../../ecs-serializable/types/SystemDefinition";
import { reactToDeleteReducer } from "./reactToDeleteReducer";

export const deleteSystemReducer: EditorStateReducer<SystemDefinitionId> = (
  state,
  systemId
) => {
  const index = state.systems.findIndex(({ id }) => id === systemId);
  if (index === -1) {
    throw new Error("Can't find system");
  }
  const deletedState = {
    ...state,
    systems: without(state.systems, state.systems[index]),
  };
  return reactToDeleteReducer(deletedState, {
    previousState: state,
    objectName: "system",
    didDelete: (selectedSystem) => selectedSystem?.id === systemId,
  });
};
