import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { EntityInitializerId } from "../../../ecs-serializable/src/definition/EntityInitializer";

export const setSelectedEntityInitializer = createEditorStateReducer<EntityInitializerId>(
  (state, { payload: entityInitializerId }) => {
    state.inspected = { type: "entityInitializer", id: entityInitializerId };
  }
);
