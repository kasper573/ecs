import { SerializableSystem } from "./SerializableSystem";
import { SerializableScene } from "./SerializableScene";
import { SerializableEntity } from "./SerializableEntity";
import { SerializableComponent } from "./SerializableComponent";
import { SerializableProperty } from "./SerializableProperty";

/**
 * All known objects in the editor
 */
export type EditorObjects = {
  system?: SerializableSystem;
  scene?: SerializableScene;
  entity?: SerializableEntity;
  component?: SerializableComponent;
  property?: SerializableProperty;
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
