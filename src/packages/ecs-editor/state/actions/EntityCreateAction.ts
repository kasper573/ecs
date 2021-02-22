import { EditorAction } from "../EditorAction";

export type EntityCreateAction = EditorAction<
  "CREATE_ENTITY",
  { name: string }
>;
