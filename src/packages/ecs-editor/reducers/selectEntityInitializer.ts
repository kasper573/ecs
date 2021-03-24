import { EditorStateReducer } from "../types/EditorStateReducer";
import { EntityInitializerId } from "../../ecs-serializable/types/EntityInitializer";
import { setSelectedObject } from "./setSelectedObject";

export const selectEntityInitializer: EditorStateReducer<EntityInitializerId> = (
  state,
  { payload: entityInitializerId }
) =>
  setSelectedObject(state, {
    objectName: "inspected",
    selectedValue: { type: "entityInitializer", id: entityInitializerId },
  });
