import React, { ReactElement } from "react";
import { MenuItemElement, useMenu } from "../hooks/useMenu";

type MenuForProps<T extends Element> = {
  items: MenuItemElement[];
  children: (props: { onClick: React.MouseEventHandler<T> }) => ReactElement;
};

/**
 * Convenience render prop variant of useMenu hook
 */
export const MenuFor = <T extends Element>({
  items,
  children: Trigger,
}: MenuForProps<T>) => {
  const [handleClick, menu] = useMenu<T>(items);
  return (
    <>
      <Trigger onClick={handleClick} />
      {menu}
    </>
  );
};
