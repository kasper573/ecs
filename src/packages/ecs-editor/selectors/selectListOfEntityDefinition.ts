import { values } from "../../nominal";
import { EditorState } from "../types/EditorState";
import { LibraryEntityNode } from "../../ecs-serializable/types/LibraryNode";

export const selectListOfEntityDefinition = (state: EditorState) =>
  values(state.ecs.library)
    .filter(
      (node): node is LibraryEntityNode =>
        node.type === "entity" && node.systemId === state.selection.system
    )
    .map((node) => node.entity);
