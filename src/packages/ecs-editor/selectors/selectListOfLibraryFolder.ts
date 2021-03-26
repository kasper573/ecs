import { values } from "../../nominal";
import { EditorState } from "../types/EditorState";

export const selectListOfLibraryFolder = (
  state: EditorState,
  forSystemId = state.selection.system
) =>
  values(state.ecs.libraryFolders).filter(
    (folder) => folder.systemId === forSystemId
  );
