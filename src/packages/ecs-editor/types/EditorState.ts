import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { EditorSelectionValues } from "./EditorSelection";

/**
 * Immutable state representing the current state of the editor.
 * Any changes to state must be done via mutation functions in `mutations/`,
 * preferably via the main reducer `mutations/updateState.ts`.
 */
export type EditorState = {
  /**
   * ECS definitions
   */
  systems: SystemDefinition[];
  /**
   * The current selection in the UI
   */
  selection: EditorSelectionValues;
};
