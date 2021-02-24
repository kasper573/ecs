import { List, ListProps } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { CrudListItem, CrudListItemProps } from "./CrudListItem";
import { CrudListSubheader } from "./CrudListSubheader";
import { noop } from "./noop";

export type CrudListProps<T> = Omit<ListProps, "onChange"> & {
  /**
   * The name to use as title
   */
  name: string;
  /**
   * The list of items to display
   */
  items: T[];
  /**
   * The item that should be highlighted as active in the list.
   * (Should be controlled by the item emitted by onSelectItem)
   */
  active?: T;
  /**
   * Resolves the CrudListItemProps to pass on to each rendered CrudListItem
   */
  getItemProps?: (item: T) => Partial<CrudListItemProps>;
  /**
   * Called when an item is selected
   */
  onSelectItem?: (item: T) => void;
  /**
   * Called when the Add new item button is pressed
   */
  onCreateItem?: () => void;
  /**
   * Called when the edit button for an item is pressed
   */
  onUpdateItem?: (item: T) => void;
  /**
   * Called when the delete button for an item is pressed
   * @param item
   */
  onDeleteItem?: (item: T) => void;
  /**
   * Set to false to disable item selection.
   * Defaults to true.
   */
  selectable?: boolean;
};

/**
 * A List that exposes UI actions for select, create, update and
 * delete via abstract events (see on<Action>Item properties).
 */
export function CrudList<T>({
  name,
  items,
  active,
  selectable = true,
  getItemProps = () => ({}),
  onSelectItem = noop,
  onCreateItem = noop,
  onUpdateItem = noop,
  onDeleteItem = noop,
  ...listProps
}: CrudListProps<T>) {
  return (
    <FlexListWithDivider
      subheader={<CrudListSubheader title={name} onCreate={onCreateItem} />}
      {...listProps}
    >
      {items.map((item, index) => (
        <CrudListItem
          key={index}
          name={name}
          onClick={() => selectable && onSelectItem(item)}
          onEdit={() => onUpdateItem(item)}
          onDelete={() => onDeleteItem(item)}
          selected={selectable && active === item}
          button={selectable}
          {...getItemProps(item)}
        />
      ))}
    </FlexListWithDivider>
  );
}

const FlexListWithDivider = styled(List)`
  display: flex;
  flex-direction: column;
  flex: 1;
  & + & {
    border-left: 1px solid ${({ theme }) => theme.palette.text.secondary};
  }
`;
