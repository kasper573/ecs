import {
  MouseEventHandler,
  MouseEvent,
  ReactElement,
  useState,
  cloneElement,
  ComponentProps,
} from "react";
import { Menu, MenuItem, MenuProps } from "@material-ui/core";
import { defined } from "../../ecs-common/defined";

export type UseMenuItemsConfig = MenuItemRenderer | MaybeMenuItemElements;

export const useMenu = (menuItemsConfig: UseMenuItemsConfig) => {
  const [position, setPosition] = useState<{ left: number; top: number }>();

  const handleTrigger: MouseEventHandler = (event) => {
    event.preventDefault();
    setPosition({
      left: event.clientX - 2,
      top: event.clientY - 4,
    });
  };

  const handleClose: CloseHandler = (e) => {
    if (e) {
      e.stopPropagation();
    }
    setPosition(undefined);
  };

  let menuItems;

  if (typeof menuItemsConfig === "function") {
    // Function style configuration only automates keys,
    // close callback will have to be called manually
    menuItems = defined(
      menuItemsConfig({ close: handleClose })
    ).map((element, index) => cloneElement(element, { key: index }));
  } else {
    // Item array style configuration automates keys and close callback
    menuItems = defined(menuItemsConfig).map((element, index) => {
      return cloneElement(element, {
        key: index,
        onClick: (e: MouseEvent<HTMLLIElement>) => {
          handleClose(e);
          if (element.props.onClick) {
            element.props.onClick(e);
          }
        },
      });
    });
  }

  const menu = (
    <Menu
      open={!!position}
      onClose={handleClose as MenuProps["onClose"]} // Need to override since MenuProps["onClose"] is poorly defined
      anchorReference="anchorPosition"
      anchorPosition={position}
    >
      {menuItems}
    </Menu>
  );

  return [handleTrigger, menu] as const;
};

type CloseHandler = (e?: MouseEvent) => void;

type MenuItemElement = ReactElement<ComponentProps<typeof MenuItem>>;

type MaybeMenuItemElements = Array<MenuItemElement | undefined>;

export type MenuItemRendererProps = {
  close: CloseHandler;
};

type MenuItemRenderer = (props: MenuItemRendererProps) => MaybeMenuItemElements;
