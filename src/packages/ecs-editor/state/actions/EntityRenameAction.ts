import { EditorAction } from "../EditorAction";
import { SerializableEntity } from "../persisted/SerializableEntity";

export type EntityRenameAction = EditorAction<
  "RENAME_ENTITY",
  { entity: SerializableEntity; name: string }
>;
