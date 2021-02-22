import { EditorAction } from "../EditorAction";

export type PropertyCreateAction = EditorAction<
  "CREATE_PROPERTY",
  { name: string }
>;
