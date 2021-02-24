import { SerializedSystem } from "../types/SerializedSystem";
import { SerializedScene } from "../types/SerializedScene";
import { SerializedEntity } from "../types/SerializedEntity";
import { SerializedComponent } from "../types/SerializedComponent";

export const createSystem = (name: string): SerializedSystem => ({
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

export const createScene = (name: string): SerializedScene => ({
  name,
  entities: [
    createEntity("Entity A"),
    createEntity("Entity B"),
    createEntity("Entity C"),
    createEntity("Entity D"),
    createEntity("Entity E"),
  ],
});

export const createEntity = (name: string): SerializedEntity => ({
  name,
  components: [
    createComponent("Component A"),
    createComponent("Component B"),
    createComponent("Component C"),
    createComponent("Component D"),
    createComponent("Component E"),
  ],
});

export const createComponent = (name: string): SerializedComponent => ({
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
