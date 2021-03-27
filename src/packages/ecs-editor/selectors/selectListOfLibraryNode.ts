import { EditorState } from "../types/EditorState";
import { SystemDefinitionId } from "../../ecs-serializable/types/SystemDefinition";
import { createShallowSelector } from "../functions/createShallowSelector";
import { selectListOfLibraryFolder } from "./selectListOfLibraryFolder";
import { selectListOfComponentDefinition } from "./selectListOfComponentDefinition";
import { selectListOfEntityDefinition } from "./selectListOfEntityDefinition";

const selectParams = (
  state: EditorState,
  forSystemId: SystemDefinitionId | undefined = state.selection.system
) =>
  [
    selectListOfEntityDefinition(state, forSystemId),
    selectListOfComponentDefinition(state, forSystemId),
    selectListOfLibraryFolder(state, forSystemId),
  ] as const;

export const selectListOfLibraryNode = createShallowSelector(
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
