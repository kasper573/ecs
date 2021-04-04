import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { LibraryFolder } from "../../ecs-serializable/types/LibraryFolder";

export const createLibraryFolder = createEditorStateReducer<LibraryFolder>(
  ({ ecs: { libraryFolders } }, { payload: folder }) => {
    libraryFolders[folder.id] = folder;
  }
);
