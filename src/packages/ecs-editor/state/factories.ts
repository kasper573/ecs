import { SerializableSystem } from "./persisted/SerializableSystem";
import { SerializableScene } from "./persisted/SerializableScene";
import { SerializableEntity } from "./persisted/SerializableEntity";
import { SerializableComponent } from "./persisted/SerializableComponent";

export const createSystem = (name: string): SerializableSystem => ({
  name,
  scenes: [
    createScene("Scene A"),
    createScene("Scene B"),
    createScene("Scene C"),
  ],
});

export const createScene = (name: string): SerializableScene => ({
  name,
  entities: [
    createEntity("Entity A"),
    createEntity("Entity B"),
    createEntity("Entity C"),
  ],
});

export const createEntity = (name: string): SerializableEntity => ({
  name,
  components: [
    createComponent("Component A"),
    createComponent("Component B"),
    createComponent("Component C"),
  ],
});

export const createComponent = (name: string): SerializableComponent => ({
  name,
  properties: [
    createProperty("propertyA", "value A"),
    createProperty("propertyB", "value B"),
    createProperty("propertyC", "value C"),
  ],
});

export const createProperty = (name: string, value: string) => ({
  name,
  value,
});
