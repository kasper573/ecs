import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { EntityInitializerId } from "../../ecs-serializable/types/EntityInitializer";
import { setSelectedObject } from "./setSelectedObject";

export const selectEntityInitializer = createEditorStateReducer<EntityInitializerId>(
  (state, { payload: entityInitializerId }) =>
    setSelectedObject(state, {
      objectName: "inspected",
      selectedValue: { type: "entityInitializer", id: entityInitializerId },
    })
);
