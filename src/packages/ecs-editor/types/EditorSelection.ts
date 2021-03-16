import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { InspectedValue } from "./InspectedValue";
import { InspectedObject } from "./InspectedObject";

/**
 * Serializable values that represent the current selection state of the UI
 */
export type EditorSelectionValues = Partial<{
  system: SystemDefinition["id"];
  scene: SceneDefinition["id"];
  inspected: InspectedValue;
}>;

/**
 * Selection objects resolved using the corresponding selection values.
 * (EditorSelectionValues resolves into EditorSelectionObjects)
 */
export type EditorSelectionObjects = {
  // Makes sure we use the same keys as EditorSelection
  [K in keyof EditorSelectionValues]: {
    system: SystemDefinition;
    scene: SceneDefinition;
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
  "scene",
  "inspected",
];
