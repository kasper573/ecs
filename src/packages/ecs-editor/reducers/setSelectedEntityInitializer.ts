import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { EntityInitializerId } from "../../ecs-serializable/types/EntityInitializer";
import {
  setSelectedObject,
  setSelectedObjectAction,
} from "./setSelectedObject";

export const setSelectedEntityInitializer = createEditorStateReducer<EntityInitializerId>(
  (state, { payload: entityInitializerId }) =>
    setSelectedObject(
      state,
      setSelectedObjectAction({
        type: "inspected",
        value: { type: "entityInitializer", id: entityInitializerId },
      })
    )
);
