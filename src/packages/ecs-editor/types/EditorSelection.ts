import { SystemDefinition } from "../../ecs-serializable/definition/SystemDefinition";
import { InspectedValue } from "./InspectedValue";

/**
 * Serializable values that represent the current selection state of the UI
 */
export type EditorSelectionValues = Partial<EditorSelectionValuesDefined>;

export type EditorSelectionValuesDefined = {
  system: SystemDefinition["id"];
  inspected: InspectedValue;
};

/**
 * Names of all known objects in the editor
 */
export type EditorSelectionName = keyof EditorSelectionValues;

/**
 * The hierarchical order of all selections.
 * Selecting any of these objects will reset selection for all descendants.
 */
export const editorSelectionOrder: EditorSelectionName[] = [
  "system",
  "inspected",
];
