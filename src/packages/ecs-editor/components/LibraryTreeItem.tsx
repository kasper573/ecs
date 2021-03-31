import styled from "styled-components";
import { TreeItem } from "@material-ui/lab";
import { useDrag, useDrop } from "react-dnd";
import { LibraryTreeNode } from "../types/LibraryTreeNode";
import { useContextMenu } from "../hooks/useContextMenu";
import { DiscriminatedLibraryNode } from "../types/DiscriminatedLibraryNode";
import { MaybeMenuItemElements, MenuItemRendererProps } from "../hooks/useMenu";
import { useStore } from "../store";
import { libraryNodeDragSpec } from "../dnd/libraryNodeDragSpec";
import { libraryNodeDropSpec } from "../dnd/libraryNodeDropSpec";
import {
  ComponentDefinitionIcon,
  EntityDefinitionIcon,
  FolderIcon,
  FolderOpenIcon,
} from "./icons";
import { LibraryTreeItems } from "./LibraryTreeItems";

export type LibraryTreeItemProps = {
  node: LibraryTreeNode;
  onMoveNode?: (
    node: DiscriminatedLibraryNode,
    target: DiscriminatedLibraryNode
  ) => void;
  menuItems?: (
    node: DiscriminatedLibraryNode,
    props: MenuItemRendererProps
  ) => MaybeMenuItemElements;
};

export const LibraryTreeItem = ({
  node,
  onMoveNode = noop,
  menuItems = noop,
}: LibraryTreeItemProps) => {
  const store = useStore();
  const [, drag] = useDrag(libraryNodeDragSpec(node.value));
  const [{ canDrop }, drop] = useDrop(
    libraryNodeDropSpec(node.value, handleDrop, () => store.getState().present)
  );
  const isFolder = node.value.type === "folder";
  const [triggerProps, contextMenu] = useContextMenu((props) =>
    menuItems(node.value, props)
  );

  function attachDndRef(el: HTMLElement) {
    drag(el);
    drop(el);
  }

  function handleDrop(draggedNode: DiscriminatedLibraryNode) {
    if (canDrop) {
      onMoveNode(draggedNode, node.value);
    }
  }

  const LabelIcon = labelIcons[node.value.type];
  const collapseIcon = isFolder ? <FolderOpenIcon /> : <LabelIcon />;
  const expandIcon = isFolder ? <FolderIcon /> : <LabelIcon />;

  return (
    <>
      {contextMenu}
      <TreeItemWithoutFocusColor
        ref={attachDndRef}
        key={node.value.nodeId}
        nodeId={node.value.nodeId}
        label={node.value.name}
        collapseIcon={collapseIcon}
        expandIcon={expandIcon}
        $highlightDrop={canDrop}
        {...triggerProps}
      >
        <LibraryTreeItems
          nodes={node.children}
          itemProps={{ menuItems, onMoveNode }}
        />
      </TreeItemWithoutFocusColor>
    </>
  );
};

const TreeItemWithoutFocusColor = styled(TreeItem)<{ $highlightDrop: boolean }>`
  &.MuiTreeItem-root:not(.Mui-selected):focus
    > .MuiTreeItem-content
    .MuiTreeItem-label {
    background-color: transparent;
  }

  // the only direct child div is a .MuiTreeItem-content
  > div {
    background-color: ${({ theme, $highlightDrop }) =>
      $highlightDrop ? theme.palette.divider : "transparent"};
  }
`;

const labelIcons = {
  folder: FolderIcon,
  entity: EntityDefinitionIcon,
  component: ComponentDefinitionIcon,
};

const noop = () => [];
