import { PaletteType } from "@material-ui/core";
import { ECSDefinition } from "../../../ecs-serializable/src/definition/ECSDefinition";
import { InspectedValue } from "./InspectedValue";

/**
 * Immutable state representing the current state of the editor.
 * Any changes to state must be done via mutation functions in `mutations/`,
 * preferably via the main reducer `mutations/updateState.ts`.
 */
export type EditorState = {
  ecs: ECSDefinition;
  themeType: PaletteType;
  inspected?: InspectedValue;
};
