import { PaletteType } from "@material-ui/core";
import { ECSDefinition } from "../../ecs-serializable/definition/ECSDefinition";
import { EditorSelectionName, EditorSelectionValues } from "./EditorSelection";

/**
 * Immutable state representing the current state of the editor.
 * Any changes to state must be done via mutation functions in `mutations/`,
 * preferably via the main reducer `mutations/updateState.ts`.
 */
export type EditorState = {
  ecs: ECSDefinition;
  themeType: PaletteType;
  /**
   * The current selection in the UI
   */
  selection: EditorSelectionValues;
  mostRecentSelectionName?: EditorSelectionName;
};
