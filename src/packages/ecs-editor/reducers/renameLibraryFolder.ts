import { get, set } from "../../ecs-common/nominal";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { LibraryFolderId } from "../../ecs-serializable/types/LibraryFolder";

export const renameLibraryFolder = createEditorStateReducer<{
  id: LibraryFolderId;
  name: string;
}>(({ ecs: { libraryFolders } }, { payload: { id, name } }) => {
  const folder = get(libraryFolders, id);
  if (!folder) {
    throw new Error("Could not find library folder");
  }
  set(libraryFolders, id, { ...folder, name });
});
