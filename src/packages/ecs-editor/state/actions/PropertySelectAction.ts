import { EditorAction } from "../EditorAction";
import { SerializableProperty } from "../persisted/SerializableProperty";

export type PropertySelectAction = EditorAction<
  "SELECT_PROPERTY",
  { property: SerializableProperty }
>;
