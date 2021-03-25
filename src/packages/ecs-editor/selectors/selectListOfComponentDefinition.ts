import { values } from "../../nominal";
import { EditorState } from "../types/EditorState";
import { LibraryComponentNode } from "../../ecs-serializable/types/LibraryNode";

export const selectListOfComponentDefinition = (state: EditorState) =>
  values(state.ecs.library)
    .filter(
      (node): node is LibraryComponentNode =>
        node.type === "component" && node.systemId === state.selection.system
    )
    .map((node) => node.component);
