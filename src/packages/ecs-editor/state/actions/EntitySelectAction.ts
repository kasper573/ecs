import { EditorAction } from "../EditorAction";
import { SerializableEntity } from "../persisted/SerializableEntity";

export type EntitySelectAction = EditorAction<
  "SELECT_ENTITY",
  { entity: SerializableEntity }
>;
