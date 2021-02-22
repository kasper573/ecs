import { EditorAction } from "../EditorAction";
import { SerializableProperty } from "../persisted/SerializableProperty";

export type PropertyRenameAction = EditorAction<
  "RENAME_PROPERTY",
  { property: SerializableProperty; name: string }
>;
