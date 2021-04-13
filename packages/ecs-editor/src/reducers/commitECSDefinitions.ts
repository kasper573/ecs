import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { ECSDefinition } from "../../../ecs-serializable/src/definition/ECSDefinition";
import { typedKeys } from "../../../ecs-common/src/typedKeys";

export const commitECSDefinitions = createEditorStateReducer<ECSDefinition[]>(
  (state, { payload: commits }) => {
    for (const commit of commits) {
      // All properties in an ECSDefinition is a record
      for (const key of typedKeys(commit)) {
        // Transfer all entries in each record
        for (const id of typedKeys(commit[key])) {
          state.ecs[key][id] = commit[key][id];
        }
      }
    }
  }
);
