import { Fragment } from "react";
import { TreeNode } from "../tree/TreeNode";
import { CommonTreeItem, CommonTreeItemProps } from "./CommonTreeItem";
import { CommonTreeDropDivider } from "./CommonTreeDropDivider";

export type CommonTreeItemListProps<T, Id extends string> = {
  nodes: TreeNode<T>[];
  itemProps: Omit<CommonTreeItemProps<T, Id>, "node">;
};

export function CommonTreeItemList<T, Id extends string>({
  nodes,
  itemProps,
}: CommonTreeItemListProps<T, Id>) {
  const dividerDestination = nodes[0] && nodes[0].parent?.value;
  return (
    <>
      {itemProps.dndDivider && (
        <CommonTreeDropDivider
          {...itemProps}
          destination={dividerDestination}
          order={0}
        />
      )}
      {nodes.map((node, index) => (
        <Fragment key={itemProps.getNodeId(node.value)}>
          <CommonTreeItem {...itemProps} node={node} />
          {itemProps.dndDivider && (
            <CommonTreeDropDivider
              {...itemProps}
              destination={dividerDestination}
              order={index + 1}
            />
          )}
        </Fragment>
      ))}
    </>
  );
}
