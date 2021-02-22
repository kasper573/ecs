import { EditorAction } from "../EditorAction";
import { SerializableEntity } from "../persisted/SerializableEntity";

export type EntityDeleteAction = EditorAction<
  "DELETE_ENTITY",
  { entity: SerializableEntity }
>;
