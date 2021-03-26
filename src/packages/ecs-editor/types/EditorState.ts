import { ECSDefinition } from "../../ecs-serializable/types/ECSDefinition";
import { EditorSelectionValues } from "./EditorSelection";

/**
 * Immutable state representing the current state of the editor.
 * Any changes to state must be done via mutation functions in `mutations/`,
 * preferably via the main reducer `mutations/updateState.ts`.
 */
export type EditorState = {
  ecs: ECSDefinition;
  /**
   * The current selection in the UI
   */
  selection: EditorSelectionValues;
};
