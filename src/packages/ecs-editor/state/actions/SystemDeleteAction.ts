import { SerializableSystem } from "../persisted/SerializableSystem";
import { EditorAction } from "../EditorAction";

export type SystemDeleteAction = EditorAction<
  "DELETE_SYSTEM",
  { system: SerializableSystem }
>;
