import { ChangeEvent, useMemo, useState } from "react";
import { TreeView } from "@material-ui/lab";
import {
  LibraryNode,
  LibraryNodeId,
} from "../../ecs-serializable/types/LibraryNode";
import { createLibraryTree } from "../functions/createLibraryTree";
import { getLibraryNodeLabel } from "../functions/getLibraryNodeLabel";
import { TreeNode } from "../types/TreeNode";
import { get, set } from "../../nominal";
import { LibraryTreeItems } from "./LibraryTreeItems";
import { LibraryTreeItemProps } from "./LibraryTreeItem";

export type LibraryTreeProps = {
  selected?: LibraryNode;
  onSelectedChange: (newSelected: LibraryNode) => void;
  library: LibraryNode[];
} & Pick<LibraryTreeItemProps, "onEdit" | "onDelete">;

/**
 * Displays a LibraryDefinition as a MUI TreeView.
 */
export const LibraryTree = ({
  library,
  selected,
  onSelectedChange,
  onEdit,
  onDelete,
}: LibraryTreeProps) => {
  const [expanded, setExpanded] = useState<LibraryNodeId[]>([]);
  const [nodeMap, treeRoots] = useMemo(() => {
    const map = library.reduce(
      (map, node) => set(map, node.id, node),
      {} as Record<LibraryNodeId, LibraryNode>
    );
    return [
      map,
      createLibraryTree(library, { compareFn: compareLibraryTreeNodes }),
    ] as const;
  }, [library]);

  const handleToggle = (e: ChangeEvent<{}>, nodeIds: string[]) =>
    setExpanded(nodeIds as LibraryNodeId[]);

  const handleSelect = (e: ChangeEvent<{}>, nodeIdStr: string) => {
    // Cannot select folders
    const nodeId = nodeIdStr as LibraryNodeId;
    const node = get(nodeMap, nodeId);
    if (node && node.type !== "folder") {
      onSelectedChange(node);
    }
  };

  return (
    <TreeView
      expanded={expanded}
      selected={selected?.id ?? ""}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
    >
      <LibraryTreeItems nodes={treeRoots} itemProps={{ onEdit, onDelete }} />
    </TreeView>
  );
};

const compareLibraryTreeNodes = (
  a: TreeNode<LibraryNode>,
  b: TreeNode<LibraryNode>
) => {
  const aLabel = getLibraryNodeLabel(a.value);
  const bLabel = getLibraryNodeLabel(b.value);
  return aLabel.localeCompare(bLabel);
};
