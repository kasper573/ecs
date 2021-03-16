import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { LibraryNode } from "../../ecs-serializable/types/LibraryNode";

/**
 * Serializable values that represent the current selection state of the UI
 */
export type EditorSelectionValues = Partial<{
  system: SystemDefinition["id"];
  scene: SceneDefinition["id"];
  inspected: InspectedObjectId;
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
 * The selection value that represents what should be displayed in the inspector panel
 */
export type InspectedObjectId =
  | InspectedLibraryNodeId
  | InspectedEntityInitializerId;

type InspectedLibraryNodeId = {
  type: "libraryNode";
  id: LibraryNode["id"];
};

type InspectedEntityInitializerId = {
  type: "entityInitializer";
  id: EntityInitializer["id"];
};

/**
 * The selection object that InspectedObjectId resolves into.
 */
export type InspectedObject = InspectedEntityInitializer | InspectedLibraryNode;

type InspectedLibraryNode = {
  type: "libraryNode";
  object: LibraryNode;
};

type InspectedEntityInitializer = {
  type: "entityInitializer";
  object: EntityInitializer;
};

/**
 * The hierarchical order of all selections.
 * Selecting any of these objects will reset selection for all descendants.
 */
export const editorSelectionOrder: EditorSelectionName[] = [
  "system",
  "scene",
  "inspected",
];
