import { EditorAction } from "../EditorAction";

export type SystemCreateAction = EditorAction<
  "CREATE_SYSTEM",
  { name: string }
>;
