import { SerializableEntity } from "./SerializableEntity";

export type SerializableScene = {
  name: string;
  entities: SerializableEntity[];
};
