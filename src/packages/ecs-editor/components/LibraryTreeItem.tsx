import styled from "styled-components";
import { TreeItem } from "@material-ui/lab";
import {
  DragSourceMonitor,
  DropTargetMonitor,
  useDrag,
  useDrop,
} from "react-dnd";
import { LibraryTreeNode } from "../types/LibraryTreeNode";
import { useContextMenu } from "../hooks/useContextMenu";
import { DiscriminatedLibraryNode } from "../types/DiscriminatedLibraryNode";
import { DragType } from "../types/DragType";
import { MaybeMenuItemElements, MenuItemRendererProps } from "../hooks/useMenu";
import { canMoveLibraryNodeTo } from "../functions/canMoveLibraryNodeTo";
import { EditorState } from "../types/EditorState";
import { useStore } from "../store";
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
  const [, drag] = useDrag(dragSpec(node.value));
  const [{ acceptsDrop }, drop] = useDrop(
    dropSpec(node.value, handleDrop, () => store.getState().present)
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
    if (acceptsDrop) {
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
        $highlightDrop={acceptsDrop}
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

const dragSpec = (node: DiscriminatedLibraryNode) => ({
  options: { dropEffect: "move" },
  type: getDragTypeForNode(node),
  item: node as unknown,
  collect: (monitor: DragSourceMonitor) => ({
    isDragging: monitor.isDragging(),
    node,
  }),
});

const dropSpec = (
  targetNode: DiscriminatedLibraryNode,
  handleDrop: (node: DiscriminatedLibraryNode) => void,
  getEditorState: () => EditorState
) => ({
  drop: handleDrop,
  accept:
    targetNode.type === "folder"
      ? [
          DragType.EntityDefinition,
          DragType.ComponentDefinition,
          DragType.LibraryFolder,
        ]
      : [],
  collect: (monitor: DropTargetMonitor) => ({
    acceptsDrop:
      monitor.isOver({ shallow: true }) &&
      canMoveLibraryNodeTo(
        getEditorState(),
        monitor.getItem<DiscriminatedLibraryNode>().nodeId,
        targetNode.nodeId
      ),
  }),
});

function getDragTypeForNode(node: DiscriminatedLibraryNode) {
  switch (node.type) {
    case "component":
      return DragType.ComponentDefinition;
    case "entity":
      return DragType.EntityDefinition;
    case "folder":
      return DragType.LibraryFolder;
  }
}

const noop = () => [];
