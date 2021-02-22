import { EditorAction } from "../EditorAction";

export type SceneCreateAction = EditorAction<"CREATE_SCENE", { name: string }>;
