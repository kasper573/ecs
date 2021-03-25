import { EditorState } from "../types/EditorState";
import { EntityDefinitionId } from "../../ecs-serializable/types/EntityDefinition";
import { values } from "../../nominal";
import { LibraryEntityNode } from "../../ecs-serializable/types/LibraryNode";

export const selectEntityDefinition = (id?: EntityDefinitionId) => (
  state: EditorState
) => {
  if (!id) {
    return;
  }
  const node = values(state.ecs.library).find(
    (node): node is LibraryEntityNode =>
      node.type === "entity" && node.entity.id === id
  );
  return node?.entity;
};
