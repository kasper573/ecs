import { MouseEventHandler, ReactElement } from "react";
import { UseMenuItemsConfig, useMenu } from "../hooks/useMenu";

type MenuForProps = {
  items: UseMenuItemsConfig;
  children: (props: { onClick: MouseEventHandler }) => ReactElement;
};

/**
 * Convenience render prop variant of useMenu hook
 */
export const MenuFor = ({ items, children: Trigger }: MenuForProps) => {
  const [handleClick, menu] = useMenu(items);
  return (
    <>
      <Trigger onClick={handleClick} />
      {menu}
    </>
  );
};
