import { EditorAction } from "../EditorAction";
import { SerializableComponent } from "../persisted/SerializableComponent";

export type ComponentDeleteAction = EditorAction<
  "DELETE_COMPONENT",
  { component: SerializableComponent }
>;
