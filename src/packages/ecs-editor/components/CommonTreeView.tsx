import { ChangeEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { TreeView, TreeViewProps } from "@material-ui/lab";
import styled from "styled-components";
import { useDrop } from "react-dnd";
import { uniq } from "lodash";
import { createTree, CreateTreeOptions } from "../tree/createTree";
import { getAncestorNodes } from "../tree/getAncestorNodes";
import { useAsRef } from "../../ecs-common/useAsRef";
import {
  CommonTreeItemList,
  CommonTreeItemListProps,
} from "./CommonTreeItemList";

export type CommonTreeViewProps<T, Id extends string> = {
  nodes: T[];
  selected?: T;
  initialExpanded: (nodes: T[]) => T[];
  onSelectedChange: (newSelected: T) => void;
  treeOptions: CreateTreeOptions<T, Id>;
  itemProps: Omit<CommonTreeItemListProps<T, Id>["itemProps"], "getNodeId">;
  children?: ReactNode;
} & Pick<TreeViewProps, "className" | "style">;

export function CommonTreeView<T, Id extends string>({
  nodes,
  selected,
  onSelectedChange,
  itemProps,
  initialExpanded,
  treeOptions,
  children,
  ...treeViewProps
}: CommonTreeViewProps<T, Id>) {
  const [treeRoots, nodeMap] = useMemo(() => createTree(nodes, treeOptions), [
    nodes,
    treeOptions,
  ]);
  const [expanded, setExpanded] = useState(() =>
    initialExpanded(nodes).map(treeOptions.getId)
  );

  const [{ canDrop: canDropToRoot }, rootDrop] = useDrop(
    itemProps.dropSpec(undefined, handleMoveToRoot)
  );

  function handleMoveToRoot(dragged: T) {
    const { onMoveNode } = itemProps;
    if (onMoveNode && canDropToRoot) {
      onMoveNode(dragged);
    }
  }

  const handleToggle = (e: ChangeEvent, ids: string[]) => {
    if (isTreeViewItemIcon(e.target)) {
      setExpanded(ids as Id[]);
    }
  };

  const handleSelect = (e: ChangeEvent<{}>, id: string) =>
    onSelectedChange(nodeMap.get(id as Id)!.value);

  // Auto expand the required nodes to show the new selection
  // (useful when selections change externally, ie. "go to definition")
  const ref = useAsRef({ nodeMap, treeOptions, expanded });
  useEffect(() => {
    if (selected) {
      const { nodeMap, treeOptions } = ref.current;
      const showNode = nodeMap.get(treeOptions.getId(selected))!;
      const requiredToShow = getAncestorNodes(showNode).map(treeOptions.getId);
      setExpanded(
        uniq([
          ...ref.current.expanded, // Keep current expansion
          ...requiredToShow, // Expand to show selection
        ])
      );
    }
  }, [selected, ref]);

  return (
    <Grow ref={rootDrop}>
      <TreeViewWithLeftMargin
        expanded={expanded}
        selected={selected ? treeOptions.getId(selected) : ""}
        onNodeToggle={handleToggle as TreeViewProps["onNodeToggle"]}
        onNodeSelect={handleSelect}
        {...treeViewProps}
      >
        <CommonTreeItemList
          nodes={treeRoots}
          itemProps={{ ...itemProps, getNodeId: treeOptions.getId }}
        />
      </TreeViewWithLeftMargin>
      {children}
    </Grow>
  );
}

const Grow = styled.div`
  flex: 1;
`;

const TreeViewWithLeftMargin = styled(TreeView)`
  margin-left: ${({ theme }) => theme.spacing(2)}px;
`;

// An SVG icon would have path/svg as event source
const isTreeViewItemIcon = (target: Element) =>
  ["path", "svg"].includes(target.tagName);
