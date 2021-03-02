import { EditorStateReducer } from "../types/EditorStateReducer";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { selectObjectReducer } from "./selectObjectReducer";

export const selectComponentDefinitionReducer: EditorStateReducer<ComponentDefinition> = (
  state,
  componentDefinition
) =>
  selectObjectReducer(state, {
    objectName: "componentDefinition",
    selectedObject: componentDefinition,
  });
