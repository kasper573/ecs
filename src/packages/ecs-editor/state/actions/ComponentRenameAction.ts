import { EditorAction } from "../EditorAction";
import { SerializableComponent } from "../persisted/SerializableComponent";

export type ComponentRenameAction = EditorAction<
  "RENAME_COMPONENT",
  { component: SerializableComponent; name: string }
>;
