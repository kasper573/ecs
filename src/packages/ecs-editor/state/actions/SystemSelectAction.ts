import { SerializableSystem } from "../persisted/SerializableSystem";
import { EditorAction } from "../EditorAction";

export type SystemSelectAction = EditorAction<
  "SELECT_SYSTEM",
  { system: SerializableSystem }
>;
