import { List, ListProps } from "@material-ui/core";
import React from "react";
import { CrudListItem, CrudListItemProps } from "./CrudListItem";

export type CrudListProps<T> = Omit<ListProps, "onChange"> & {
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
  getItemKey?: (item: T, index: number) => string | number;
  /**
   * Resolves the CrudListItemProps to pass on to each rendered CrudListItem
   */
  getItemProps?: (item: T) => Partial<CrudListItemProps>;
  /**
   * Called when an item is selected
   * (Items not selectable if this callback is not specified)
   */
  onSelectItem?: (item: T) => void;
  /**
   * Called when the edit button for an item is pressed
   * (No create button is shown if this callback is not specified)
   */
  onUpdateItem?: (item: T) => void;
  /**
   * Called when the delete button for an item is pressed.
   * (No edit button is shown if this callback is not specified)
   */
  onDeleteItem?: (item: T) => void;
  /**
   * Set to false to disable item selection.
   * (No delete button is shown if this callback is not specified)
   * Defaults to true.
   */
  selectable?: boolean;
};

/**
 * A List that exposes UI actions for select, create, update and
 * delete via abstract events (see on<Action>Item properties).
 */
export function CrudList<T>({
  title,
  items,
  active,
  getItemKey = defaultKey,
  getItemProps = defaultProps,
  onSelectItem,
  onUpdateItem,
  onDeleteItem,
  ...listProps
}: CrudListProps<T>) {
  const selectable = !!onSelectItem;
  return (
    <List {...listProps}>
      {items.map((item, index) => (
        <CrudListItem
          key={getItemKey(item, index)}
          name={`Item ${index + 1}`}
          onClick={onSelectItem ? () => onSelectItem(item) : undefined}
          onEdit={onUpdateItem ? () => onUpdateItem(item) : undefined}
          onDelete={onDeleteItem ? () => onDeleteItem(item) : undefined}
          selected={selectable && active === item}
          button={selectable}
          {...getItemProps(item)}
        />
      ))}
    </List>
  );
}

const defaultProps = () => ({});

const defaultKey = (item: unknown, index: number) => index;
