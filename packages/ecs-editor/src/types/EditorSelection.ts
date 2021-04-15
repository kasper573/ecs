import { InspectedValue } from "./InspectedValue";

/**
 * Serializable values that represent the current selection state of the UI
 */
export type EditorSelectionValues = Partial<EditorSelectionValuesDefined>;

export type EditorSelectionValuesDefined = {
  inspected: InspectedValue;
};

/**
 * Names of all known objects in the editor
 */
export type EditorSelectionName = keyof EditorSelectionValues;
