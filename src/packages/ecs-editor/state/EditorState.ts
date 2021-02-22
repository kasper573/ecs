import { EditorSelection } from "./EditorSelection";
import { SerializableSystem } from "./persisted/SerializableSystem";

/**
 * Immutable state representing the current state of the editor.
 * Any changes to state must be done via mutation functions in state/mutations,
 * preferably via the main reducer updateState.ts.
 */
export type EditorState = {
  /**
   * All the ECS serialized
   */
  systems: SerializableSystem[];
  /**
   * Represents the current selection in the UI
   */
  selection: EditorSelection;
};
