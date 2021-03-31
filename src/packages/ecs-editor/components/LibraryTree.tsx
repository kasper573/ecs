import { ChangeEvent, useMemo, useState } from "react";
import { TreeView } from "@material-ui/lab";
import { LibraryNodeId } from "../../ecs-serializable/types/LibraryNode";
import { createLibraryTree } from "../functions/createLibraryTree";
import { get, set } from "../../ecs-common/nominal";
import { DiscriminatedLibraryNode } from "../types/DiscriminatedLibraryNode";
import { compareLibraryTreeNodes } from "../functions/compareLibraryTreeNodes";
import { LibraryTreeItems, LibraryTreeItemsProps } from "./LibraryTreeItems";

export type LibraryTreeProps = {
  selected?: DiscriminatedLibraryNode;
  onSelectedChange: (newSelected: DiscriminatedLibraryNode) => void;
  library: DiscriminatedLibraryNode[];
  itemProps?: LibraryTreeItemsProps["itemProps"];
};

/**
 * Displays a LibraryDefinition as a MUI TreeView.
 */
export const LibraryTree = ({
  library,
  selected,
  onSelectedChange,
  itemProps,
}: LibraryTreeProps) => {
  const [expanded, setExpanded] = useState<LibraryNodeId[]>([]);
  const [nodeMap, treeRoots] = useMemo(() => {
    const map = library.reduce(
      (map, node) => set(map, node.nodeId, node),
      {} as Record<LibraryNodeId, DiscriminatedLibraryNode>
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
    >
      <LibraryTreeItems nodes={treeRoots} itemProps={itemProps} />
    </TreeView>
  );
};
