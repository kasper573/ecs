import { createSystemDefinition } from "../../ecs-serializable/factories/createSystemDefinition";
import { EditorStateReducer } from "../types/EditorStateReducer";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";

export const createSystemReducer: EditorStateReducer<SystemDefinition> = (
  state,
  system
) => ({
  ...state,
  systems: [
    ...state.systems,
    createSystemDefinition(system, state.nativeComponents),
  ],
});
