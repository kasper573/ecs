import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { LibraryFolderId } from "../../../ecs-serializable/src/definition/LibraryFolder";

export const renameLibraryFolder = createEditorStateReducer<{
  id: LibraryFolderId;
  name: string;
}>(({ ecs: { libraryFolders } }, { payload: { id, name } }) => {
  const folder = libraryFolders[id];
  if (!folder) {
    throw new Error("Could not find library folder");
  }
  libraryFolders[id] = { ...folder, name };
});
