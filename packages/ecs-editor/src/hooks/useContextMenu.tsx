import { UseMenuItemsConfig, useMenu } from "./useMenu";

export const useContextMenu = (menuItems: UseMenuItemsConfig) => {
  const [handleClick, menu] = useMenu(menuItems);

  const triggerProps = { onContextMenu: handleClick };
  return [triggerProps, menu] as const;
};
