import { EditorSelection } from "./EditorSelection";
import { SerializedSystem } from "./SerializedSystem";

/**
 * Immutable state representing the current state of the editor.
 * Any changes to state must be done via mutation functions in `mutations/`,
 * preferably via the main reducer `mutations/updateState.ts`.
 */
export type EditorState = {
  /**
   * The ECS trees serialized
   */
  systems: SerializedSystem[];
  /**
   * The current selection in the UI
   */
  selection: EditorSelection;
};
