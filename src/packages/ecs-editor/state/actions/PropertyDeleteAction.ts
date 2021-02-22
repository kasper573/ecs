import { EditorAction } from "../EditorAction";
import { SerializableProperty } from "../persisted/SerializableProperty";

export type PropertyDeleteAction = EditorAction<
  "DELETE_PROPERTY",
  { property: SerializableProperty }
>;
