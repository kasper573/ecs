import { EditorState } from "../types/EditorState";
import { values } from "../../nominal";
import { ComponentDefinitionId } from "../../ecs-serializable/types/ComponentDefinition";
import { LibraryComponentNode } from "../../ecs-serializable/types/LibraryNode";

export const selectComponentDefinition = (id?: ComponentDefinitionId) => (
  state: EditorState
) => {
  if (!id) {
    return;
  }
  const node = values(state.ecs.library).find(
    (node): node is LibraryComponentNode =>
      node.type === "component" && node.component.id === id
  );
  return node?.component;
};
