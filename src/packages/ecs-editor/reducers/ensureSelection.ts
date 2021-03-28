import { getDefaultSelectionValue } from "../functions/getDefaultSelectionValue";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { get } from "../../ecs-common/nominal";
import { core } from "../core";
import { setSelectedSystemDefinition } from "./setSelectedSystemDefinition";
import { setSelectedSceneDefinition } from "./setSelectedSceneDefinition";

/**
 * Ensures selection for objects that has a default available.
 */
export const ensureSelection = createEditorStateReducer((state) => {
  const { ecs, selection } = state;
  const selectedSystem = selection.system && get(ecs.systems, selection.system);
  const selectedScene = selection.scene && get(ecs.scenes, selection.scene);
  if (!selectedSystem) {
    setSelectedSystemDefinition(
      state,
      core.actions.setSelectedSystemDefinition(
        getDefaultSelectionValue(state, "system")
      )
    );
  }
  if (!selectedScene) {
    setSelectedSceneDefinition(
      state,
      core.actions.setSelectedSceneDefinition(
        getDefaultSelectionValue(state, "scene")
      )
    );
  }
});
