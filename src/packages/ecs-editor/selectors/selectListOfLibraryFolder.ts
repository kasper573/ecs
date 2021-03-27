import { values } from "../../ecs-common/nominal";
import { EditorState } from "../types/EditorState";
import { createShallowSelector } from "../functions/createShallowSelector";
import { SystemDefinitionId } from "../../ecs-serializable/types/SystemDefinition";

export const selectListOfLibraryFolder = createShallowSelector(
  (
    state: EditorState,
    forSystemId: SystemDefinitionId | undefined = state.selection.system
  ) => [state.ecs.libraryFolders, forSystemId] as const,
  ([libraryFolders, forSystemId]) =>
    values(libraryFolders).filter((folder) => folder.systemId === forSystemId)
);
