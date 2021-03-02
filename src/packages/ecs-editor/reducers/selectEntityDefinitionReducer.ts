import { EditorStateReducer } from "../types/EditorStateReducer";
import { EntityDefinition } from "../../ecs-serializable/types/EntityDefinition";
import { selectObjectReducer } from "./selectObjectReducer";

export const selectEntityDefinitionReducer: EditorStateReducer<EntityDefinition> = (
  state,
  entityDefinition
) =>
  selectObjectReducer(state, {
    objectName: "entityDefinition",
    selectedObject: entityDefinition,
  });
