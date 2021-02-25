import { List, ListProps } from "@material-ui/core";
import React from "react";
import { CrudListItem, CrudListItemProps } from "./CrudListItem";
import { CrudListSubheader, CrudListSubheaderProps } from "./CrudListSubheader";
import { noop } from "./functions/noop";

export type CrudListProps<T> = Omit<ListProps, "onChange"> &
  Partial<Pick<CrudListSubheaderProps, "title" | "noun">> & {
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
  title,
  noun,
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
    <List
      subheader={
        title ? (
          <CrudListSubheader
            title={title}
            noun={noun}
            onCreate={onCreateItem}
          />
        ) : undefined
      }
      {...listProps}
    >
      {items.map((item, index) => (
        <CrudListItem
          key={index}
          name={noun ?? `Item ${index + 1}`}
          onClick={() => selectable && onSelectItem(item)}
          onEdit={() => onUpdateItem(item)}
          onDelete={() => onDeleteItem(item)}
          selected={selectable && active === item}
          button={selectable}
          {...getItemProps(item)}
        />
      ))}
    </List>
  );
}
