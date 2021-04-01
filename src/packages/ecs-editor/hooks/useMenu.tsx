import {
  MouseEventHandler,
  MouseEvent,
  ReactElement,
  useState,
  cloneElement,
  ComponentProps,
} from "react";
import { Menu, MenuItem, MenuProps } from "@material-ui/core";

export type UseMenuItemsConfig = MenuItemRenderer | MaybeMenuItemElements;

export const useMenu = (menuItemsConfig: UseMenuItemsConfig) => {
  const [position, setPosition] = useState<{ left: number; top: number }>();

  const handleTrigger: MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPosition({
      left: e.clientX - 2,
      top: e.clientY - 4,
    });
  };

  const handleClose: CloseHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPosition(undefined);
  };

  let menuItems;

  if (Array.isArray(menuItemsConfig)) {
    // Item array style configuration automates close callback calls.
    menuItems = defined(menuItemsConfig).map((element) =>
      cloneElement(element, {
        onClick: (e: MouseEvent<HTMLLIElement>) => {
          handleClose(e);
          if (element.props.onClick) {
            element.props.onClick(e);
          }
        },
      })
    );
  } else {
    // Functional configuration style does not automate close callback calls.
    menuItems = defined(menuItemsConfig({ close: handleClose }));
  }

  const menu = (
    <Menu
      open={!!position}
      onClose={handleClose as MenuProps["onClose"]} // Need to override since MenuProps["onClose"] is poorly defined
      onContextMenu={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={position}
    >
      {menuItems.map((item, index) => (
        // Wrapping each item in a span allows for nested menus.
        // It also allows us to automate keys without using cloneElement.
        <span key={index}>{item}</span>
      ))}
    </Menu>
  );

  return [handleTrigger, menu] as const;
};

export type CloseHandler = (e: MouseEvent) => void;

export type MenuItemElement = ReactElement<ComponentProps<typeof MenuItem>>;

export type MaybeMenuItemElements = Array<
  MenuItemElement | undefined | boolean
>;

export type MenuItemRendererProps = {
  close: CloseHandler;
};

export type MenuItemRenderer = (
  props: MenuItemRendererProps
) => MaybeMenuItemElements;

function defined<T>(items: Array<T | undefined | boolean>): T[] {
  return items.filter((item): item is T => !!item);
}
