import { SerializableSystem } from "./SerializableSystem";
import { SerializableScene } from "./SerializableScene";
import { SerializableEntity } from "./SerializableEntity";
import { SerializableComponent } from "./SerializableComponent";
import { SerializableProperty } from "./SerializableProperty";

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
