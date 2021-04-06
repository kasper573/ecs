import { ChangeEvent, useState } from "react";
import { TreeView, TreeViewProps } from "@material-ui/lab";
import styled from "styled-components";
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
} & Pick<TreeViewProps, "className" | "style">;

export function CommonTreeView<T, Id extends string>({
  nodes,
  selected,
  onSelectedChange,
  itemProps,
  initialExpanded,
  treeOptions,
  ...treeViewProps
}: CommonTreeViewProps<T, Id>) {
  const [nodeMap, treeRoots] = useTree(nodes, treeOptions);
  const [expanded, setExpanded] = useState(() =>
    initialExpanded(nodes).map(treeOptions.getId)
  );

  const handleToggle = (e: ChangeEvent<{}>, ids: string[]) =>
    setExpanded(ids as Id[]);

  const handleSelect = (e: ChangeEvent<{}>, id: string) =>
    onSelectedChange(nodeMap.get(id as Id)!);

  return (
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
  );
}

const TreeViewWithLeftMargin = styled(TreeView)`
  margin-left: ${({ theme }) => theme.spacing(2)}px;
`;
