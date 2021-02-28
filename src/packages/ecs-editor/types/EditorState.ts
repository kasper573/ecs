import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { NativeComponents } from "../../ecs-serializable/types/NativeComponents";
import { EditorSelection } from "./EditorSelection";

/**
 * Immutable state representing the current state of the editor.
 * Any changes to state must be done via mutation functions in `mutations/`,
 * preferably via the main reducer `mutations/updateState.ts`.
 */
export type EditorState = {
  /**
   * The native components needed by the
   * ComponentDefinitions in the system libraries
   */
  nativeComponents: NativeComponents;
  /**
   * ECS definitions
   */
  systems: SystemDefinition[];
  /**
   * The current selection in the UI
   */
  selection: EditorSelection;
};
