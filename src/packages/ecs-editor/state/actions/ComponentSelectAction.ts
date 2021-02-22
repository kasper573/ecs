import { EditorAction } from "../EditorAction";
import { SerializableComponent } from "../persisted/SerializableComponent";

export type ComponentSelectAction = EditorAction<
  "SELECT_COMPONENT",
  { component: SerializableComponent }
>;
