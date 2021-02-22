import { EditorAction } from "../EditorAction";
import { SerializableScene } from "../persisted/SerializableScene";

export type SceneSelectAction = EditorAction<
  "SELECT_SCENE",
  { scene: SerializableScene }
>;
