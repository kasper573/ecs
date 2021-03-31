import { EditorState } from "../types/EditorState";
import { LibraryNodeId } from "../../ecs-serializable/types/LibraryNode";
import { values } from "../../ecs-common/nominal";
import { getDescendantNodeIds } from "./getDescendantNodeIds";

export const canMoveLibraryNodeTo = (
  state: EditorState,
  id: LibraryNodeId,
  targetId: LibraryNodeId
) => {
  const invalidTargetIds = [
    id,
    ...getDescendantNodeIds(values(state.ecs.libraryFolders), id),
  ];
  return !invalidTargetIds.includes(targetId);
};
