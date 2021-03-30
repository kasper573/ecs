import { set } from "../../ecs-common/nominal";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { LibraryFolder } from "../../ecs-serializable/types/LibraryFolder";

export const createLibraryFolder = createEditorStateReducer<LibraryFolder>(
  ({ ecs: { libraryFolders } }, { payload: folder }) => {
    set(libraryFolders, folder.id, folder);
  }
);
