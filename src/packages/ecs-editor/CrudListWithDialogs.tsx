import React, { useState } from "react";
import { CrudList, CrudListProps } from "./CrudList";
import { DeleteDialog } from "./dialogs/DeleteDialog";
import { NameDialog } from "./dialogs/NameDialog";

export type CrudListWithActionUIProps<T> = {
  getItemName: (item: T) => string;
  onCreateItem: (name: string) => void;
  onRenameItem: (item: T, newName: string) => void;
  onDeleteItem: (item: T) => void;
} & Omit<
  // Omit the abstract CRUD events since we're replacing them with specific versions above
  CrudListProps<T>,
  "onCreateItem" | "onUpdateItem" | "onDeleteItem"
>;

type DialogKind = "create" | "rename" | "delete";

export function CrudListWithDialogs<T>({
  items,
  name: listName,
  getItemName,
  onCreateItem,
  onRenameItem,
  onDeleteItem,
  ...listProps
}: CrudListWithActionUIProps<T>) {
  // State
  const [dialog, setDialog] = useState<DialogKind>();
  const [selectedItem, selectItem] = useState<T>();
  const selectedItemName = selectedItem ? getItemName(selectedItem) : "";

  // Event handlers
  const handleClose = () => setDialog(undefined);
  const handleRename = (newName: string) =>
    onRenameItem(selectedItem!, newName);
  const handleDelete = () => onDeleteItem(selectedItem!);

  // Actions
  const showCreateDialog = () => {
    selectItem(undefined);
    setDialog("create");
  };
  const showRenameDialog = (item: T) => {
    setDialog("rename");
    selectItem(item);
  };
  const showDeleteDialog = (item: T) => {
    setDialog("delete");
    selectItem(item);
  };

  return (
    <>
      <CrudList
        {...listProps}
        items={items}
        name={listName}
        onCreateItem={showCreateDialog}
        onDeleteItem={showDeleteDialog}
        onUpdateItem={showRenameDialog}
      />
      <NameDialog
        open={dialog === "create"}
        title={`Add ${listName}`}
        defaultValue={selectedItemName}
        onClose={handleClose}
        onSave={onCreateItem}
      />
      <NameDialog
        open={dialog === "rename"}
        title={`Edit "${selectedItemName}"`}
        defaultValue={selectedItemName}
        onClose={handleClose}
        onSave={handleRename}
      />
      <DeleteDialog
        open={dialog === "delete"}
        onClose={handleClose}
        onDelete={handleDelete}
        name={selectedItemName}
      />
    </>
  );
}
