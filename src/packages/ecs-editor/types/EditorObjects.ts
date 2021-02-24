import { SerializedSystem } from "./SerializedSystem";
import { SerializedScene } from "./SerializedScene";
import { SerializedEntity } from "./SerializedEntity";
import { SerializedComponent } from "./SerializedComponent";
import { SerializedProperty } from "./SerializedProperty";

/**
 * All known objects in the editor
 */
export type EditorObjects = {
  system?: SerializedSystem;
  scene?: SerializedScene;
  entity?: SerializedEntity;
  component?: SerializedComponent;
  property?: SerializedProperty;
};

/**
 * Names of all known objects in the editor
 */
export type EditorObjectName = keyof EditorObjects;

/**
 * Types of all the known objects in the editor
 */
export type EditorObject = Exclude<EditorObjects[EditorObjectName], undefined>;

/**
 * The hierarchical order of all editor objects.
 */
export const editorObjectsOrder: Array<keyof EditorObjects> = [
  "system",
  "scene",
  "entity",
  "component",
  "property",
];
