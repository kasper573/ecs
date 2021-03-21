import {
  cloneElement,
  ComponentProps,
  CSSProperties,
  MouseEvent,
  MouseEventHandler,
  ReactElement,
  useState,
} from "react";
import { Menu, MenuItem } from "@material-ui/core";

type MenuItemElement = ReactElement<ComponentProps<typeof MenuItem>>;

export const useContextMenu = (
  maybeMenuItems: Array<MenuItemElement | undefined>
): [TriggerProps, ReactElement] => {
  const [position, setPosition] = useState<{ left: number; top: number }>();

  // Skip falsy items (for convenient use of this hook)
  const menuItems = maybeMenuItems.filter(
    (item): item is MenuItemElement => !!item
  );

  // Disable context menu when no items are present
  if (!menuItems.length) {
    return [{}, <></>];
  }

  const handleClick: MouseEventHandler = (event) => {
    event.preventDefault();
    setPosition({
      left: event.clientX - 2,
      top: event.clientY - 4,
    });
  };

  const handleClose = () => {
    setPosition(undefined);
  };

  const triggerProps: TriggerProps = {
    onContextMenu: handleClick,
    style: { cursor: "context-menu" },
  };

  const menu = (
    <Menu
      keepMounted
      open={!!position}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={position}
    >
      {menuItems.map((element, index) =>
        cloneElement(element, {
          key: index,
          onClick: (e: MouseEvent<HTMLLIElement>) => {
            e.stopPropagation();
            handleClose();
            if (element.props.onClick) {
              element.props.onClick(e);
            }
          },
        })
      )}
    </Menu>
  );

  return [triggerProps, menu];
};

type TriggerProps = {
  onContextMenu?: MouseEventHandler;
  style?: CSSProperties;
};
