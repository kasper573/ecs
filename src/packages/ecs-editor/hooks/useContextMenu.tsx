import { MenuItemElement, useMenu } from "./useMenu";

export const useContextMenu = (
  maybeMenuItems: Array<MenuItemElement | undefined>
) => {
  const [handleClick, menu] = useMenu(maybeMenuItems);

  const triggerProps = {
    onContextMenu: handleClick,
    style: { cursor: "context-menu" },
  };
  return [triggerProps, menu] as const;
};
