import { EditorStateReducer } from "../types/EditorStateReducer";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { selectObjectReducer } from "./selectObjectReducer";

export const selectEntityInitializerReducer: EditorStateReducer<EntityInitializer> = (
  state,
  entityInitializer
) =>
  selectObjectReducer(state, {
    objectName: "entityInitializer",
    selectedObject: entityInitializer,
  });
