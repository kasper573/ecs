import { getDefaultSelectionValue } from "../functions/getDefaultSelectionValue";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { core } from "../core";
import { setSelectedSystemDefinition } from "./setSelectedSystemDefinition";

/**
 * Ensures selection for objects that has a default available.
 */
export const ensureSelection = createEditorStateReducer((state) => {
  const { ecs, selection } = state;
  const selectedSystem = selection.system && ecs.systems[selection.system];
  if (!selectedSystem) {
    setSelectedSystemDefinition(
      state,
      core.actions.setSelectedSystemDefinition(
        getDefaultSelectionValue(state, "system")
      )
    );
  }
});
