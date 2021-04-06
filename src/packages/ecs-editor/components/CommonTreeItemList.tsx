import { TreeNode } from "../tree/TreeNode";
import { CommonTreeItem, CommonTreeItemProps } from "./CommonTreeItem";

export type CommonTreeItemListProps<T, Id extends string> = {
  nodes: TreeNode<T>[];
  itemProps: Omit<CommonTreeItemProps<T, Id>, "node">;
};

export function CommonTreeItemList<T, Id extends string>({
  nodes,
  itemProps,
}: CommonTreeItemListProps<T, Id>) {
  return (
    <>
      {nodes.map((node) => (
        <CommonTreeItem
          {...itemProps}
          key={itemProps.getNodeId(node.value)}
          node={node}
        />
      ))}
    </>
  );
}
