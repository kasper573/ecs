import { EditorState } from "../types/EditorState";
import { createMemoizedSelector } from "../functions/createMemoizedSelector";
import { SystemDefinitionId } from "../../../ecs-serializable/src/definition/SystemDefinition";

export const selectListOfLibraryFolder = createMemoizedSelector(
  (
    state: EditorState,
    forSystemId: SystemDefinitionId | undefined = state.selection.system
  ) => [state.ecs.libraryFolders, forSystemId] as const,
  ([libraryFolders, forSystemId]) =>
    Object.values(libraryFolders).filter(
      (folder) => folder.systemId === forSystemId
    )
);
