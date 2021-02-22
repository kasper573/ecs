import { EditorAction } from "../EditorAction";

export type ComponentCreateAction = EditorAction<
  "CREATE_COMPONENT",
  { name: string }
>;
