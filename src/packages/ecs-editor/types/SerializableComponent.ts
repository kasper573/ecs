import { SerializableProperty } from "./SerializableProperty";

export type SerializableComponent = {
  name: string;
  properties: SerializableProperty[];
};
