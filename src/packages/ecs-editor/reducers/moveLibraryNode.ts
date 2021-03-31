import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { LibraryNodeId } from "../../ecs-serializable/types/LibraryNode";
import { getLibraryNode } from "../functions/getLibraryNode";
import { values } from "../../ecs-common/nominal";
import { getDescendantNodeIds } from "../functions/getDescendantNodeIds";

export const moveLibraryNode = createEditorStateReducer<{
  id: LibraryNodeId;
  targetId: LibraryNodeId;
}>(({ ecs }, { payload: { id, targetId } }) => {
  const node = getLibraryNode(ecs, id);
  if (!node) {
    throw new Error("Could not find library node to move");
  }
  const invalidTargetIds = [
    id,
    ...getDescendantNodeIds(values(ecs.libraryFolders), id),
  ];
  if (!invalidTargetIds.includes(targetId)) {
    node.object.parentNodeId = targetId;
  }
});
