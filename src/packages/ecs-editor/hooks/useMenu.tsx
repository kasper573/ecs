import {
  cloneElement,
  ComponentProps,
  MouseEvent,
  MouseEventHandler,
  ReactElement,
  useState,
} from "react";
import { Menu, MenuItem } from "@material-ui/core";

export type MenuItemElement = ReactElement<ComponentProps<typeof MenuItem>>;

export const useMenu = <TriggerElement extends Element>(
  maybeMenuItems: Array<MenuItemElement | undefined>
) => {
  const [position, setPosition] = useState<{ left: number; top: number }>();

  // Skip falsy items (for convenient use of this hook)
  const menuItems = maybeMenuItems.filter(
    (item): item is MenuItemElement => !!item
  );

  const handleTrigger: MouseEventHandler<TriggerElement> = (event) => {
    event.preventDefault();
    setPosition({
      left: event.clientX - 2,
      top: event.clientY - 4,
    });
  };

  const handleClose = () => {
    setPosition(undefined);
  };

  // Disable menu when no items are present
  const menu = menuItems.length > 0 && (
    <Menu
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

  return [handleTrigger, menu] as const;
};
