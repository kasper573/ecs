import styled from "styled-components";
import { TreeItem, TreeItemProps } from "@material-ui/lab";
import {
  DragSourceHookSpec,
  DropTargetHookSpec,
  useDrag,
  useDrop,
} from "react-dnd";
import { useContextMenu } from "../hooks/useContextMenu";
import { MaybeMenuItemElements, MenuItemRendererProps } from "../hooks/useMenu";
import { useEmptyDNDPreview } from "../hooks/useEmptyDNDPreview";
import { TreeNode } from "../tree/TreeNode";
import { omit } from "../../ecs-common/omit";
import { CommonTreeItemList } from "./CommonTreeItemList";

export type CommonTreeItemProps<T, Id extends string> = {
  node: TreeNode<T>;
  menuItems?: (value: T, props: MenuItemRendererProps) => MaybeMenuItemElements;
  dragSpec: (value: T) => DragSourceHookSpec<T, unknown, {}>;
  dropSpec: (
    value?: T,
    order?: number
  ) => DropTargetHookSpec<T, unknown, { canDrop: boolean }>;
  getNodeId: (value: T) => Id;
  treeItemProps: (node: TreeNode<T>) => Omit<TreeItemProps, "nodeId">;
  faded?: (value: T) => boolean;
  dndDivider?: boolean;
  depth?: number;
};

export function CommonTreeItem<T, Id extends string>(
  itemProps: CommonTreeItemProps<T, Id>
) {
  const {
    node,
    treeItemProps,
    menuItems = emptyArray,
    faded = no,
    dragSpec,
    dropSpec,
    getNodeId,
    depth = 0,
  } = itemProps;
  const [, drag, preview] = useDrag(dragSpec(node.value));
  const [{ canDrop }, drop] = useDrop(dropSpec(node.value));
  useEmptyDNDPreview(preview);
  const [triggerProps, contextMenu] = useContextMenu((props) =>
    menuItems(node.value, props)
  );
  function attachDndRef(el: HTMLElement) {
    drag(el);
    drop(el);
  }

  const nodeId = getNodeId(node.value);
  return (
    <>
      {contextMenu}
      <TreeItemWithoutFocusColor
        ref={attachDndRef}
        $highlightDrop={canDrop}
        $faded={faded(node.value)}
        key={nodeId}
        nodeId={nodeId}
        {...treeItemProps(node)}
        {...triggerProps}
      >
        <CommonTreeItemList
          nodes={node.children}
          itemProps={omit(itemProps, "node")}
          depth={depth + 1}
        />
      </TreeItemWithoutFocusColor>
    </>
  );
}

const TreeItemWithoutFocusColor = styled(TreeItem)<{
  $faded: boolean;
  $highlightDrop: boolean;
}>`
  &.MuiTreeItem-root:not(.Mui-selected):focus
    > .MuiTreeItem-content
    .MuiTreeItem-label {
    background-color: transparent;
  }

  & > .MuiTreeItem-content {
    transition: ${({ theme }) =>
      theme.transitions.create("opacity", {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.sharp,
      })};
    opacity: ${({ $faded }) => ($faded ? 0.5 : 1)};
    background-color: ${({ theme, $highlightDrop }) =>
      $highlightDrop ? theme.palette.divider : "transparent"};
  }
`;

const emptyArray = () => [];
const no = () => false;
