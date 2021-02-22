import { SerializableSystem } from "../persisted/SerializableSystem";
import { EditorAction } from "../EditorAction";

export type SystemRenameAction = EditorAction<
  "RENAME_SYSTEM",
  { system: SerializableSystem; name: string }
>;
