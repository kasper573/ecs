import { ChangeEvent, ReactNode, useState } from "react";
import { TreeView, TreeViewProps } from "@material-ui/lab";
import styled from "styled-components";
import { useDrop } from "react-dnd";
import { CreateTreeOptions } from "../tree/createTree";
import { useTree } from "../tree/useTree";
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
  const [nodeMap, treeRoots] = useTree(nodes, treeOptions);
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

  const handleToggle = (e: ChangeEvent<{}>, ids: string[]) =>
    setExpanded(ids as Id[]);

  const handleSelect = (e: ChangeEvent<{}>, id: string) =>
    onSelectedChange(nodeMap.get(id as Id)!);

  return (
    <Grow ref={rootDrop}>
      <TreeViewWithLeftMargin
        expanded={expanded}
        selected={selected ? treeOptions.getId(selected) : ""}
        onNodeToggle={handleToggle}
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
