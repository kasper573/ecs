import { EditorAction } from "../EditorAction";
import { SerializableScene } from "../persisted/SerializableScene";

export type SceneRenameAction = EditorAction<
  "RENAME_SCENE",
  { scene: SerializableScene; name: string }
>;
