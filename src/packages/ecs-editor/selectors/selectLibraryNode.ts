import { EditorState } from "../types/EditorState";
import { LibraryNodeId } from "../../ecs-serializable/types/LibraryNode";
import { createMemoizedSelector } from "../functions/createMemoizedSelector";
import { getLibraryNode } from "../functions/getLibraryNode";

const selectParams = ({ ecs }: EditorState, nodeId: LibraryNodeId) =>
  [
    ecs.entityDefinitions,
    ecs.componentDefinitions,
    ecs.libraryFolders,
    nodeId,
  ] as const;

export const selectLibraryNode = createMemoizedSelector(
  selectParams,
  ([entityDefinitions, componentDefinitions, libraryFolders, nodeId]) =>
    getLibraryNode(
      { entityDefinitions, componentDefinitions, libraryFolders },
      nodeId
    )
);
