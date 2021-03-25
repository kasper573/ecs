import { values } from "../../nominal";
import { EditorState } from "../types/EditorState";

export const selectListOfLibraryNode = (state: EditorState) =>
  values(state.ecs.library).filter(
    (node) => node.systemId === state.selection.system
  );
