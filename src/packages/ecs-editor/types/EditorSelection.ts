import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { InspectedValue } from "./InspectedValue";
import { InspectedObject } from "./InspectedObject";

/**
 * Serializable values that represent the current selection state of the UI
 */
export type EditorSelectionValues = Partial<EditorSelectionValuesDefined>;

export type EditorSelectionValuesDefined = {
  system: SystemDefinition["id"];
  inspected: InspectedValue;
};

/**
 * Selection objects resolved using the corresponding selection values.
 * (EditorSelectionValues resolves into EditorSelectionObjects)
 */
export type EditorSelectionObjects = {
  // Makes sure we use the same keys as EditorSelection
  [K in keyof EditorSelectionValues]: {
    system: SystemDefinition;
    inspected: InspectedObject;
  }[K];
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
