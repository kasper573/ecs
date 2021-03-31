import { EditorState } from "../types/EditorState";
import { LibraryNodeId } from "../../ecs-serializable/types/LibraryNode";
import { values } from "../../ecs-common/nominal";
import { getDescendantNodeIds } from "./getDescendantNodeIds";

export const canMoveLibraryNodeTo = (
  state: EditorState,
  id: LibraryNodeId,
  targetId: LibraryNodeId | undefined
) => {
  if (!targetId) {
    // Moving to root is always okay
    return true;
  }
  const invalidTargetIds = [
    id,
    ...getDescendantNodeIds(values(state.ecs.libraryFolders), id),
  ];
  return !invalidTargetIds.includes(targetId);
};
