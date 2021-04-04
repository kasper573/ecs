import { ChangeEvent, useMemo, useState } from "react";
import { TreeView, TreeViewProps } from "@material-ui/lab";
import { LibraryNodeId } from "../../ecs-serializable/types/LibraryNode";
import { createLibraryTree } from "../functions/createLibraryTree";
import { get, set } from "../../ecs-common/nominal";
import { TypedLibraryNode } from "../types/TypedLibraryNode";
import { compareLibraryTreeNodes } from "../functions/compareLibraryTreeNodes";
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
  const [expanded, setExpanded] = useState<LibraryNodeId[]>(() =>
    getInitialExpandedIds(library)
  );
  const [nodeMap, treeRoots] = useMemo(() => {
    const map = library.reduce(
      (map, node) => set(map, node.nodeId, node),
      {} as Record<LibraryNodeId, TypedLibraryNode>
    );
    return [
      map,
      createLibraryTree(library, { compareFn: compareLibraryTreeNodes }),
    ] as const;
  }, [library]);

  const handleToggle = (e: ChangeEvent<{}>, nodeIds: string[]) =>
    setExpanded(nodeIds as LibraryNodeId[]);

  const handleSelect = (e: ChangeEvent<{}>, nodeIdStr: string) => {
    const nodeId = nodeIdStr as LibraryNodeId;
    const node = get(nodeMap, nodeId)!;
    onSelectedChange(node);
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

const getInitialExpandedIds = (nodes: TypedLibraryNode[]) =>
  nodes
    .filter((n) => n.type === "folder" && !n.parentNodeId)
    .map((n) => n.nodeId);
