import { SerializableSystem } from "./persisted/SerializableSystem";
import { SerializableScene } from "./persisted/SerializableScene";
import { SerializableEntity } from "./persisted/SerializableEntity";
import { SerializableComponent } from "./persisted/SerializableComponent";
import { SerializableProperty } from "./persisted/SerializableProperty";

/**
 * The objects resolved by the indexes in EditorSelection
 */
export type EditorSelectionObjects = {
  system?: SerializableSystem;
  scene?: SerializableScene;
  entity?: SerializableEntity;
  component?: SerializableComponent;
  property?: SerializableProperty;
};
