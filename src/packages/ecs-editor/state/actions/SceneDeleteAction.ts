import { EditorAction } from "../EditorAction";
import { SerializableScene } from "../persisted/SerializableScene";

export type SceneDeleteAction = EditorAction<
  "DELETE_SCENE",
  { scene: SerializableScene }
>;
