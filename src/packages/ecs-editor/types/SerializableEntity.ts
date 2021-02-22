import { SerializableComponent } from "./SerializableComponent";

export type SerializableEntity = {
  name: string;
  components: SerializableComponent[];
};
