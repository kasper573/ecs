import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { LibraryNode } from "../../ecs-serializable/types/LibraryNode";

/**
 * All known objects in the editor
 */
export type EditorObjects = {
  system: SystemDefinition;
  scene: SceneDefinition;
  entityInitializer: EntityInitializer;
  libraryNode: LibraryNode;
};

/**
 * Names of all known objects in the editor
 */
export type EditorObjectName = keyof EditorObjects;

/**
 * The hierarchical order of all editor objects.
 */
export const editorObjectsOrder: EditorObjectName[] = [
  "system",
  "scene",
  "entityInitializer",
  "libraryNode",
];
