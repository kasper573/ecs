import { ChangeEvent, useState } from "react";
import { TreeView, TreeViewProps } from "@material-ui/lab";
import { LibraryNodeId } from "../../ecs-serializable/types/LibraryNode";
import { TypedLibraryNode } from "../types/TypedLibraryNode";
import { compareLibraryTreeNodes } from "../functions/compareLibraryTreeNodes";
import { CreateTreeOptions } from "../tree/createTree";
import { useTree } from "../tree/useTree";
import { LibraryTreeItems, LibraryTreeItemsProps } from "./LibraryTreeItems";

export type LibraryTreeProps = {
  selected?: TypedLibraryNode;
  onSelectedChange: (newSelected: TypedLibraryNode) => void;
  library: TypedLibraryNode[];
  itemProps?: LibraryTreeItemsProps["itemProps"];
} & Pick<TreeViewProps, "className" | "style">;

/**
 * Displays a LibraryDefinition as a MUI TreeView.
 */
export const LibraryTree = ({
  library,
  selected,
  onSelectedChange,
  itemProps,
  ...treeViewProps
}: LibraryTreeProps) => {
  const [expanded, setExpanded] = useState(() => getInitialExpanded(library));
  const [nodeMap, treeRoots] = useTree(library, treeOptions);

  const handleToggle = (e: ChangeEvent<{}>, nodeIds: string[]) =>
    setExpanded(nodeIds as LibraryNodeId[]);

  const handleSelect = (e: ChangeEvent<{}>, nodeIdStr: string) => {
    const nodeId = nodeIdStr as LibraryNodeId;
    onSelectedChange(nodeMap[nodeId]);
  };

  return (
    <TreeView
      expanded={expanded}
      selected={selected?.nodeId ?? ""}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
      {...treeViewProps}
    >
      <LibraryTreeItems nodes={treeRoots} itemProps={itemProps} />
    </TreeView>
  );
};

const treeOptions: CreateTreeOptions<TypedLibraryNode, LibraryNodeId> = {
  compareFn: compareLibraryTreeNodes,
  getId: (node) => node.nodeId,
  getParentId: (node) => node.parentNodeId,
};

const getInitialExpanded = (nodes: TypedLibraryNode[]) =>
  nodes
    .filter((n) => n.type === "folder" && !n.parentNodeId)
    .map((n) => n.nodeId);
