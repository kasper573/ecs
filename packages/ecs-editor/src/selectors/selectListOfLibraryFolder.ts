import { createMemoizedSelector } from "../functions/createMemoizedSelector";
import { EditorRootState } from "../store";
import { selectSelectedSystemDefinitionId } from "./selectSelectedSystemDefinitionId";

export const selectListOfLibraryFolder = createMemoizedSelector(
  (
    state: EditorRootState,
    forSystemId = selectSelectedSystemDefinitionId(state)
  ) => [state.editor.present.ecs.libraryFolders, forSystemId] as const,
  ([libraryFolders, forSystemId]) =>
    Object.values(libraryFolders).filter(
      (folder) => folder.systemId === forSystemId
    )
);
