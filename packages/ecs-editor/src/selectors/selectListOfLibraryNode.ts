import { createMemoizedSelector } from "../functions/createMemoizedSelector";
import { EditorRootState } from "../store";
import { selectListOfLibraryFolder } from "./selectListOfLibraryFolder";
import { selectListOfComponentDefinition } from "./selectListOfComponentDefinition";
import { selectListOfEntityDefinition } from "./selectListOfEntityDefinition";
import { selectSelectedSystemDefinitionId } from "./selectSelectedSystemDefinitionId";

const selectParams = (
  state: EditorRootState,
  forSystemId = selectSelectedSystemDefinitionId(state)
) =>
  [
    selectListOfEntityDefinition(state, forSystemId),
    selectListOfComponentDefinition(state, forSystemId),
    selectListOfLibraryFolder(state, forSystemId),
  ] as const;

export const selectListOfLibraryNode = createMemoizedSelector(
  selectParams,
  ([entityDefinitions, componentDefinitions, libraryFolders]) => {
    return [
      ...entityDefinitions.map(discriminate("entity" as const)),
      ...componentDefinitions.map(discriminate("component" as const)),
      ...libraryFolders.map(discriminate("folder" as const)),
    ];
  }
);

const discriminate = <O, T>(type: T) => (obj: O) => ({
  ...obj,
  type,
});
