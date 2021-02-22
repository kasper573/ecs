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
