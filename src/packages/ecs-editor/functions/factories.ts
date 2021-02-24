import { SerializableSystem } from "../types/SerializableSystem";
import { SerializableScene } from "../types/SerializableScene";
import { SerializableEntity } from "../types/SerializableEntity";
import { SerializableComponent } from "../types/SerializableComponent";

export const createSystem = (name: string): SerializableSystem => ({
  name,
  scenes: [
    createScene("Scene A"),
    createScene("Scene B"),
    createScene("Scene C"),
    createScene("Scene D"),
    createScene("Scene E"),
    createScene("Scene F"),
    createScene("Scene G"),
    createScene("Scene H"),
    createScene("Scene I"),
  ],
});

export const createScene = (name: string): SerializableScene => ({
  name,
  entities: [
    createEntity("Entity A"),
    createEntity("Entity B"),
    createEntity("Entity C"),
    createEntity("Entity D"),
    createEntity("Entity E"),
  ],
});

export const createEntity = (name: string): SerializableEntity => ({
  name,
  components: [
    createComponent("Component A"),
    createComponent("Component B"),
    createComponent("Component C"),
    createComponent("Component D"),
    createComponent("Component E"),
  ],
});

export const createComponent = (name: string): SerializableComponent => ({
  name,
  properties: [
    createProperty("propertyA", "value A"),
    createProperty("propertyB", "value B"),
    createProperty("propertyC", "value C"),
    createProperty("propertyD", "value D"),
    createProperty("propertyE", "value E"),
    createProperty("propertyF", "value F"),
    createProperty("propertyG", "value G"),
    createProperty("propertyH", "value H"),
  ],
});

export const createProperty = (name: string, value: string) => ({
  name,
  value,
});
