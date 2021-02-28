import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { EntityDefinition } from "../../ecs-serializable/types/EntityDefinition";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";

/**
 * All known objects in the editor
 */
export type EditorObjects = {
  system: SystemDefinition;
  scene: SceneDefinition;
  entityInitializer: EntityInitializer;
  entityDefinition: EntityDefinition;
  componentInitializer: ComponentInitializer;
  componentDefinition: ComponentDefinition;
};

/**
 * Names of all known objects in the editor
 */
export type EditorObjectName = keyof EditorObjects;

/**
 * Types of all the known objects in the editor
 */
export type EditorObject = EditorObjects[EditorObjectName];

/**
 * The hierarchical order of all editor objects.
 */
export const editorObjectsOrder: Array<keyof EditorObjects> = [
  "system",
  "scene",
  "entityInitializer",
  "entityDefinition",
  "componentInitializer",
  "componentDefinition",
];
