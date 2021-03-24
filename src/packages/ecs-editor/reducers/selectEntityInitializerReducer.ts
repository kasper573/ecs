import { EditorStateReducer } from "../types/EditorStateReducer";
import { EntityInitializerId } from "../../ecs-serializable/types/EntityInitializer";
import { selectObjectReducer } from "./selectObjectReducer";

export const selectEntityInitializerReducer: EditorStateReducer<EntityInitializerId> = (
  state,
  { payload: entityInitializerId }
) =>
  selectObjectReducer(state, {
    objectName: "inspected",
    selectedValue: { type: "entityInitializer", id: entityInitializerId },
  });
